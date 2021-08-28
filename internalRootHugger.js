// this file is for testing proxying of reactRootNode._reactRootContainer._internalRoot

const VERBOSE = true;

function interceptMethodCalls(obj, func) {
  return new Proxy(obj, {
    get : (target, prop, receiver) => {
      if (typeof target[prop] === 'function') {
        return new Proxy(target[prop], {
          apply: (target, thisArg, argumentsList) => {
            if (VERBOSE) console.log(`${prop} function called with following args: ${argumentsList}`);
            if (func) func(prop, argumentsList);
            return Reflect.apply(target, thisArg, argumentsList);
          }
        });
      } else {
        if (VERBOSE) console.log(`${prop} property requested for receiver: ${console.dir(receiver)}`);
        return Reflect.get(target, prop);
      }
    },
  
    set: (target, prop, value) => {
      if (VERBOSE) console.log(`Attempting to set ${prop} to ${value}`);
      return Reflect.set(target, prop, value);
    },

    construct: (target, args) => {
      console.log(`construct called with: target: ${pp(target.name)}, ${pp(args)}`);
      console.log(`receiver has ${Object.getOwnPropertyNames(receiver)}`);
      console.dir(receiver);
      return Reflect.construct(target, args);
    }
  })
};

const handleMethodCall = (fnName, fnArgs) => {
  console.log(`${fnName} called with `, fnArgs);
};

const reactRoots = [];

document.querySelectorAll('*').forEach(node => {
  if (node._reactRootContainer) {
    reactRoots.push(node);
    node._reactRootContainer._internalRoot.current = interceptMethodCalls(node._reactRootContainer._internalRoot.current, handleMethodCall);
  }
});