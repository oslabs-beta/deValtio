console.log(`proxyHugger2.js is running`);

const pp = (stuff) => JSON.stringify(stuff, null, 2) // Pretty Print

// const oldProxy = Proxy;

// const proxyObjects = [];

// class newProxy {
//   constructor(...props) {
//     const obj = new oldProxy(...props);
//     console.log(`new Proxy object has been created.`)
//     obj.question = (func, ...params) => {
//       setTimeout(func, 0, ...params)
//     };
//     obj.stash = [];
//     proxyObjects.push(obj);
//     return obj;
//   }
// };

// Proxy = newProxy;

// document.proxyObjects = proxyObjects;

// Proxy.prototype.question = (func, ...params) => {
//   setTimeout(func, 0, ...params)
// };
// Proxy.prototype.stash = [];

Proxy.prototype.init = ()=>console.log(`Proxy created`);