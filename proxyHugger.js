console.log(`proxyHugger.js is running`);

const pp = (stuff) => JSON.stringify(stuff, null, 2) // Pretty Print

const proxyViewer = {
  get: function (target, prop, receiver) {
    console.log(`get called with: target: ${pp(target)}, prop: ${pp(prop)}, receiver: ${pp(receiver)}`);
    return Reflect.get(...arguments);
  },
  set: function(obj, prop, value) {
    console.log(`set called with: obj: ${pp(obj)}, prop: ${pp(prop)}, value: ${pp(value)}`);
	return Reflect.get(...arguments);
  },
  construct: function(target, args) {
	  console.log(`construct called with: target: ${pp(target)}, ${pp(args)}`);
	  return Reflect.construct(target, args);
  },
};

Proxy = new Proxy(Proxy, proxyViewer);