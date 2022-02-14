const DEBUG = false;

const throttleDelay = 500;

// Lets us know our script was successfully injected
console.log(`injected.js has been initiated`);

// disable locking down object properties for fiberNode (and any other) objects
Object.preventExtensions = () => true;

// inject deValtio hook
if (!window.__deValtio) window.__deValtio = {};

window.__deValtio.DEBUG = DEBUG;

window.__deValtio.valtioFound = null;

window.__deValtio.valtioStores = [];

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

// rate limiting function
// different from throttle (and debounce) since it only runs the function once every
// X milliseconds but the function that runs is the *latest* call instead of the earliest
// (which is what you get with throttle)
const limitRate = (func, delay) => {
  let waiting;
  let latest = {};
  return (...params) => {
    if (waiting) {
      latest.params = params;
      return;
    };
    if (!waiting) {
      latest.params = params;
      waiting = true;
      setTimeout(() => {
        func.apply(null, latest.params);
        waiting = false;
      }, delay);
    }
  }
}


// func to get component (i.e. constructor) name
// this returns one or two letter names in prod mode but
// this can be adapted to still get proper component names if the site uses source maps
// and we add source map parsing
function getFiberNodeName (node) {
  // root node
  if (node.tag === 3) return 'fiberRoot';
  // functional or class component
  if (node.tag === 0 || node.tag === 1) return `${node.type?.name}`;
  // host component (renders to browser DOM)
  if (node.tag === 5) {
    return node.stateNode.className ? `${node.type}.${node.stateNode.className}` : `${node.type}`;
  }
  // everything else
  if (node.type?.$$typeof) return Symbol.keyFor(node.type.$$typeof);
  if (typeof node.type === 'string') return node.type;
  if (typeof node.type === 'function') return node.type?.name;
  if (typeof node.type === 'symbol') return node.type.toString();
};

function getFiberNodeValtioState (node) {
  if (DEBUG) console.log('checking for valtio state')
  if (!node.memoizedState) return null;
  if (typeof node.memoizedState === 'object') {
    let state = node.memoizedState;
    if (DEBUG) console.log(`parsing state`);
    while (state) {
      if (DEBUG) console.log('Checking memoizedState');
      if (DEBUG) console.dir(state);
      const baseState = state.baseState;
      const memoizedState = state.memoizedState;

      // if (baseState && typeof Array.isArray(baseState) && baseState.length === 5 && baseState === memoizedState) {
        if (baseState && typeof Array.isArray(baseState) && baseState.length === 5) {
        if (typeof baseState[0] === 'object' 
            && typeof baseState[1] === 'function' 
            && typeof baseState[2] === 'function' 
            && typeof baseState[3] === 'number') {
          let valtioSymbols = Reflect.ownKeys(baseState[0]);
          let valtioProxyStore;
          let valtioGetVersionFunction;
          for (let i = 0; i < valtioSymbols.length; i++) {
            if (typeof valtioSymbols[i] !== 'symbol') break;
            if (typeof baseState[0][valtioSymbols[i]] === 'function') {
              valtioGetVersionFunction = baseState[0][valtioSymbols[i]];
            } else {
              valtioProxyStore = baseState[0][valtioSymbols[i]];
            }
          }
          // let [valtioProxyStore, valtioGetVersionFunction] = [valtioArrValues];
          let valtioSubscriber = baseState[2];
          let valtioNakedStore = baseState[4];
          let valtioState = {
            valtioProxyStore,
            valtioGetVersionFunction,
            valtioSubscriber,
            valtioNakedStore
          };
          window.__deValtio.valtioFound = true;
          if (DEBUG) console.log('valtioState found');
          return valtioState;
        }
      }
      state = state.next;
    }
  }
};

  // function to parse Fiber Tree

function climbTree (node){
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

  let valtioStore = getFiberNodeValtioState(node);

  if (valtioStore) window.__deValtio.valtioStores.push(valtioStore);

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

function getReactRoots() {
  const reactRoots = [];
  let fiberRoot;
  document.querySelectorAll('div').forEach(node => {
    if (node._reactRootContainer) reactRoots.push(node);
  });
  if (reactRoots[0]) {
    fiberRoot = reactRoots[0]._reactRootContainer._internalRoot;
  } return reactRoots;
};

window.__deValtio.functions = {getFiberNodeName, getFiberNodeValtioState, climbTree, getReactRoots};

// main function (to be run via setTimeout since all this code is rendered before the document
// and all its associated scripts )
const deValtioMain = (fiberRoot) => {

  // expose fiberRoot via window.__deValtio hook
  window.__deValtio.fiberRoot = fiberRoot;

   const getFiberNodeProps = (node) => {
    return null;
  };
      

  // throttled sendToContentScipt
  const throttledSendToContentScript = limitRate(sendToContentScript, throttleDelay);
  
  // if fiberRoot exists, proxy it to check for current being set.
  handler.set = function (target, prop, value) {
    if (prop === 'current') {
      if (DEBUG) console.log(`current property of stateNode has been changed.`);
      if (DEBUG) console.dir(value);
      setTimeout( () => {
        let deValtioTree = climbTree(value.alternate);
        throttledSendToContentScript('deValtioTree', deValtioTree);
      }, 100);
      }
    return Reflect.set(target, prop, value);
  }

  // proxy the stateNode so that we can detect changes to fiberRoot. This avoids
  // us having to use React DevTools and wrapping their onFiberRootCommit hook.
  fiberRoot.current.stateNode = new Proxy(fiberRoot.current.stateNode, handler);

  // initial send of component tree to front end
  setTimeout( () => {
    let deValtioTree = climbTree(fiberRoot.alternate);
    sendToContentScript('deValtioTree', climbTree(deValtioTree));
  }, 50);
};


// wait 2 seconds and then check if React is on the page. If it is, run the main function.
setTimeout(() => {
  const fiberRoot = getReactRoots()[0];

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
 }, 2000);
