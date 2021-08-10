console.log(`proxyHugger.js is running`);

const proxyViewer = {
  get: function (target, prop, receiver) {
    console.log(`get called with: target: ${target}, prop: ${prop}, receiver: ${receiver}`);
    return Reflect.get(...arguments);
  },
  set: function(obj, prop, value) {
    console.log(`set called with: obj: ${obj}, prop: ${prop}, value: ${value}`);
	return Reflect.get(...arguments);
  },
  construct: function(target, args) {
	  console.log(`construct called with: target: ${target}, ${args}`);
	  return Reflect.construct(target, args);
  },
};

Proxy = new Proxy(Proxy, proxyViewer);