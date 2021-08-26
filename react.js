const VERBOSE = false;

const getReactRoots = function(startNode = document) {
  const reactRoots = [];
  startNode.querySelectorAll('*').forEach(node => {
  for (const key in node) {
    if (key.startsWith('_reactRootContainer')) {
      reactRoots.push(node);
      break;
      }
    }
  });
  if (reactRoots.length > 0) return reactRoots;
};

const isReactNode = function(node, reactID) {
  if (reactID) {
    if (('__reactInternalInstance$' + reactID) in node || ('__reactFiber$' + reactID) in node) return true;
  }
  for (const key in node) {
    if (key.startsWith('__reactInternalInstance$') || key.startsWith('__reactFiber$')) return true;
  }
  return false;
};

const getReactID = function(node) {
  for (const key in node)
    if (key.startsWith('__react') && key.includes('$')) {
      return key.split('$')[1]
    }
};

class FiberNode {
  // thanks to Max Koretskyi
  // https://indepth.dev/posts/1007/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree#linked-list-traversal
  constructor(instance) {
    this.instance = instance;
    this.child = instance.child;
    this.sibling = instance.sibling;
    this.return = instance.return;
    this.rendersElement = instance.elementType ? true : false;
    this.name = instance.type? instance.type.displayName : null;
  }
};

const getHostRoot = function(reactRootNode, returnFiberNode=true) {
  const fiberRoot = reactRootNode._reactRootContainer._internalRoot;
  const hostRoot = fiberRoot.current; // head of the Fiber tree (fiberRoot is backreferenced via current.stateNode)
  if (returnFiberNode) return new FiberNode(hostRoot);
  return hostRoot;
};

const buildFiberTree = function(fiberNode) {
  if (VERBOSE) console.log(`traversing ${fiberNode.name}`);
  
  if (fiberNode.sibling) {
    if (VERBOSE) console.log(`sibling node of ${fiberNode.name} found`);
    buildFiberTree(new FiberNode(fiberNode.sibling));
  };
  
  if (fiberNode.child) {
    if (VERBOSE) console.log(`child node of ${fiberNode.name} found`);
    buildFiberTree(new FiberNode(fiberNode.child));
  };

  return fiberNode;
};

const walkFiberTree = function(fiberNode, callback, type = 'head', size = 0) {
  // fiberNode types = head, sibling, child
  if (typeof callback !== 'function') throw 'Callback function required';

  size += 1;
  
  callback(fiberNode, type, size);

  if (fiberNode.sibling) walkFiberTree(fiberNode.sibling, callback, type = 'sibling', size);

  if (fiberNode.child) walkFiberTree(fiberNode.child, callback, type = 'child', size);
};


// this is for testing the above by running it on a page and traversing through the first Fiber root
let roots = getReactRoots();
let firstRootNode = roots[0] ? roots[0] : null;
let reactID = getReactID(firstRootNode);
let hostRoot = getHostRoot(firstRootNode);
let reactTree = buildFiberTree(hostRoot);

function callback(fiberNode, type, size) {
  console.log(`Current size is: ${size}`);
  console.log(`Current node type is ${type}`);
  if (fiberNode.rendersElement) console.log(`This renders an element`)
  if (fiberNode.name) {
    console.log(`Name at size ${size} is ${fiberNode.name}`);
  } else {console.dir(fiberNode.instance)};
};

walkFiberTree(hostRoot, callback);