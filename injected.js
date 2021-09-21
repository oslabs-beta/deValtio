console.log(`injected.js has been initiated`);

const pp = stuff => JSON.stringify(stuff, null, 2);

const origProxy = Proxy;

const proxyHandler = {
  construct: (target, args, receiver) => {
    let caller;
    
    try {
      throw new Error();
    } catch(err) {
      console.log(`err.stack is ${pp(err.stack)}`);
      caller = err.stack.split("at ")[2].split(" (")[0];
    }
    
    console.log(`Proxy caller is: ${caller} and params are ${pp(args)}`)
    // return new origProxy(target, args, receiver);
    return Reflect.construct(target, args, receiver);
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
    };
  }
};