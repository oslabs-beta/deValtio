console.log(`proxyHugger.js is running`);

const pp = (stuff) => JSON.stringify(stuff, null, 2) // Pretty Print

let counter = 0;

const proxyViewer = {
  get: function (target, prop, receiver) {
    console.log(`get called with: target: ${pp(target.name)}, prop: ${pp(prop)}, receiver: ${pp(receiver)}`);
    return Reflect.get(...arguments);
  },
  set: function(obj, prop, value) {
    console.log(`set called with: obj: ${pp(obj)}, prop: ${pp(prop)}, value: ${pp(value)}`);
	return Reflect.get(...arguments);
  },
  construct: (...params) => {
	  // console.log(`construct called with: target: ${pp(target.name)}, ${pp(args)}`);
    // console.log(`receiver has ${Object.getOwnPropertyNames(receiver)}`);
    // console.dir(receiver);
    console.dir(this)
	  return Reflect.construct(...params);
  },
  apply: function(target, thisArg, argumentsList) {
    console.log(`apply called with: ${pp(target.name)}, thisArg: ${pp(thisArg)}, argumentsList: ${pp(argumentsList)}`)
    return Reflect.apply(target, thisArg, argumentsList);
  }
};

const origProxy = Proxy;
Proxy = new origProxy(origProxy, proxyViewer);