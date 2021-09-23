console.log(`injected.js has been initiated`);

const pp = stuff => JSON.stringify(stuff, null, 2);

// disable locking down object properties for fiberNode (and any other) objects
Object.preventExtensions = () => true;

// declare fiberRoot object
let fiberRoot;

const origProxy = Proxy;

const objectHandler = {
  get: (target, prop, receiver) => {
    console.log(`target: ${target}, prop: ${prop}, receiver: ${receiver}`);
    Reflect.get(...arguments);
  }
};

const proxyHandler = {
  construct: (target, args) => {
    let caller;
    
    try {
      throw new Error();
    } catch(err) {
      // console.log(`err.stack is ${pp(err.stack)}`);
      caller = err.stack.split("at ")[2].split(" (")[0];
    }
    
    // console.log(`Proxy caller is: ${caller} and params are ${pp(args)}`)
    console.dir(args)
    // console.dir(Reflect.ownKeys(args[1]));
    // console.dir(args[1]['f'])
    // console.dir(args[1].constructor)
    // console.log(Reflect.ownKeys(args[-1]));
    // args.forEach((arg) => {
    //   console.log(`arg is ${arg}`);
    //   arg = new Proxy(arg, objectHandler);
    // });
    // // return new origProxy(target, args, receiver);
    return Reflect.construct(target, args);
  }
};

Proxy = new origProxy(origProxy, proxyHandler);

// Proxy = (target, args, receiver) => {
//   console.log(`target: ${target}, args: ${args}, receiver: ${receiver}`);
// Proxy = () => {
//   console.log(`params are: ${arguments}`);
//   // return new origProxy(arguments);
// };
// Proxy.prototype = origProxy.prototype;

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    const reactRoots = [];
    document.querySelectorAll('*').forEach(node => {
      if (node._reactRootContainer) reactRoots.push(node);
    });

    if (reactRoots[0]) {
      console.log(`React Root Found`);
      fiberRoot = reactRoots[0]._reactRootContainer._internalRoot.current;
    };
  }
};