const DEBUG = true;

const throttleDelay = 1000;

// Lets us know our script was successfully injected
console.log(`injected.js has been initiated`);

// disable locking down object properties for fiberNode (and any other) objects
Object.preventExtensions = () => true;

// inject deValtio hook
if (!window.__deValtio) window.__deValtio = {};

window.__deValtio.DEBUG = DEBUG;

// handler object to be used for our own proxies
const handler = {};

// function to send stringified data to content script
const sendToContentScript = (messageHead, messageBody) => {
  if (DEBUG) console.log(`Sending ${JSON.stringify(messageHead)}: ${JSON.stringify(messageBody)}`);
  try {
    window.postMessage({deValtioMessage: [messageHead, messageBody]});
    return true;
  } catch (err) {
    console.dir(err);
    console.log(`messageHead:`);
    console.dir(messageHead);
    console.log(`messageBody:`);
    console.dir(messageBody);
    return false;
  }
};

// create postMessage method on deValtio hook
window.__deValtio.postMessage = sendToContentScript;

// throttle function
const throttle = (func, delay) => {
  let throttled;
  return function(...params) {
    if (!throttled) {
      func.apply(this, params);
      throttled = true;
      setTimeout(() => throttled = false, delay);
    }
  }
};

// main function (to be run via setTimeout since all this code is rendered before the document
// and all its associated scripts )
const deValtioMain = (fiberRoot) => {

  // expose fiberRoot via window.__deValtio hook
  window.__deValtio.fiberRoot = fiberRoot;

  // func to get component (i.e. constructor) name
  // this returns one or two letter names in prod mode but
  // this can be adapted to still get proper component names if the site uses source maps
  // and we add source map parsing
  const getFiberNodeName = (node) => {
    // root node
    if (node.tag === 3) return 'fiberRoot';
    // functional or class component
    if (node.tag === 0 || node.tag === 1) return `${node.type?.name}`;
    // host component (renders to browser DOM)
    if (node.tag === 5) {
      return node.stateNode.className ? `${node.type}.${node.stateNode.className}` : `${node.type}`;
    }
    // everything else
    if (typeof node.type === 'string') return node.type;
    if (typeof node.type === 'function') return node.type?.name;
    if (typeof node.type === 'symbol') return node.type.toString();
  };
      

  // function to parse Fiber Tree

  const climbTree = (node) => {
    // this defines the basic deValtioTree object which is also each node object in that tree
    let deValtioTree = {
      children: []
    };

    // base case
    if (!node) return deValtioTree;

    // get tag
    deValtioTree.tag = node.tag;

    // get key
    deValtioTree.key = node.key;

    // get name of node
    deValtioTree.name = getFiberNodeName(node);

    // get state
    // TO-DO: Finish this
    deValtioTree.state = {};

    // get props
    // TO-DO: Finish this
    deValtioTree.props = null;
    // check if current node is a function component (tag: 0) or class component (tag: 1);
    // if ([0, 1].includes(node.tag)) {
    //[0,1].includes(node.tag) ? deValtioTree.props = JSON.parse(JSON.stringify(node.memoizedProps) || null) : null;
    // };

    // get hooks
    // TO-DO: Finish this
    deValtioTree.hooks = {};

    // check if current fiberNode has a child and, if so,
    // push it and any siblings to our children property
    if (node.child) {
      deValtioTree.children.push(node.child);

      if (node.child.sibling) {
        let sibling = node.child.sibling;
        while (sibling) {
          deValtioTree.children.push(sibling);
          // move on to next sibling
          sibling = sibling.sibling;
        }
      }
    };

      // traverse children array recursively and replace all fiberNodes
      // in the deValtioTree.children property with deValtioTrees
      deValtioTree.children = deValtioTree.children.map(node => climbTree(node));

      // return the deValtioTree object
      return deValtioTree;
    }

  // throttled sendToContentScipt
  const throttledSendToContentScript = throttle(sendToContentScript, throttleDelay);
  
  // if fiberRoot exists, proxy it to check for current being set.
  handler.set = function (target, prop, value) {
    if (prop === 'current') {
      if (DEBUG) console.log(`current property of stateNode has been changed.`);
      let deValtioTree = climbTree(value);
      throttledSendToContentScript('deValtioTree', deValtioTree);
      }
    return Reflect.set(target, prop, value);
  }

  // proxy the stateNode so that we can detect changes to fiberRoot. This avoids
  // us having to use React DevTools and wrapping their onFiberRootCommit hook.
  fiberRoot.current.stateNode = new Proxy(fiberRoot.current.stateNode, handler);

  // initial send of component tree to front end
  let deValtioTree = climbTree(fiberRoot);
  sendToContentScript('deValtioTree', climbTree(deValtioTree));

};


// wait 2 seconds and then check if React is on the page. If it is, run the main function.
setTimeout(() => {
  const reactRoots = [];
  let fiberRoot;
  document.querySelectorAll('div').forEach(node => {
    if (node._reactRootContainer) reactRoots.push(node);
  });
  if (reactRoots[0]) {
    fiberRoot = reactRoots[0]._reactRootContainer._internalRoot;

    // since this is a React app, we'll let the front end know
    // let timesToSend = 5;
    // messageInterval = setInterval(() => {
    //   if (timesToSend === 0) {
    //     clearInterval(messageInterval);
    //     messageInterval = null;
    //   }
    //   sendToContentScript({message: 'This is a React App'})
    //   timesToSend--;
    // }, 2000)
    deValtioMain(fiberRoot);
    }
}, 2000);
