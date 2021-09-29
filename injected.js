console.log(`injected.js has been initiated`);

const pp = stuff => JSON.stringify(stuff, null, 2);

// messaging function (to communicate with content script which will send it to frontend)

const sendToContentScript = (messageHead, messageBody) => {
  try {
    window.postMessage({messageHead : messageBody});
    return true;
  } catch (err) {
    console.dir(err);
    return false;
  }
};

// disable locking down object properties for fiberNode (and any other) objects
Object.preventExtensions = () => true;

// DECLARATIONS GO HERE

// func to get component (i.e. constructor) name
// this returns one or two letter names in prod mode but
// this can be adapted to still get proper component names if the site uses source maps
// and we add source map parsing
const getFiberNodeName = (node) => {
  // root node
  if (node.tag === 3) return 'fiberRoot';
  // functional or class component
  if (node.tag === 0 || node.tag === 1) return node.type.name;
  // host component (renders to browser DOM)
  if (node.tag === 5) {
    return node.stateNode.className ? `${node.type}.${node.stateNode.className}` : node.type;
  }
  // everything else
  if (typeof node.type === 'string') return node.type;
  if (typeof node.type === 'function') return node.type.name;
  if (typeof node.type === 'symbol') return node.type.toString();
};
  

// DeValtioNode constructor

function DeValtioNode(fiberNode, parentNode = null) {
  this.tag = fiberNode.tag;
  this.deValtioID = fiberNode.deValtioID;
  this.index = fiberNode.index;
  this.componentName = getFiberNodeName(fiberNode, parentNode);
  this.hasProps = fiberNode.memoizedProps ? true : false;
  this.hasState = fiberNode.memoizedState ? true : false;
};

// declare fiberRoot object
let fiberRoot;

// declare deValtioNodes array here so we can access it from browser console
const deValtioNodes = [];

const origProxy = Proxy;

const objectHandler = {
  get: (target, prop, receiver) => {
    console.log(`target: ${target}, prop: ${prop}, receiver: ${receiver}`);
    Reflect.get(...arguments);
  }
};

const proxyHandler = {
  construct: (proxyObj, targetObj, handler) => {
    let caller;
    
    try {
      throw new Error();
    } catch(err) {
      // console.log(`err.stack is ${pp(err.stack)}`);
      caller = err.stack.split("at ")[2].split(" (")[0];
    }

    
    
    // console.log(`Proxy caller is: ${caller} and params are ${pp(args)}`)
    // console.dir(args)
    // console.dir(Reflect.ownKeys(args[1]));
    // console.dir(args[1]['f'])
    // console.dir(args[1].constructor)
    // console.log(Reflect.ownKeys(args[-1]));
    // args.forEach((arg) => {
    //   console.log(`arg is ${arg}`);
    //   arg = new Proxy(arg, objectHandler);
    // });
    // // return new origProxy(target, args, receiver);
    return Reflect.construct(proxyObj, targetObj, handler);
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

// generateDeValtioID
const generateDeValtioID = (fiberNode, prevNode = null) => {
  try {
    let width = fiberNode.index;

    // check if fiberNode already has deValtioID
    fiberNode.deValtioID ? currentID = deValtionID : currentID = null;

    // func to check if currentID and generatedID mismatch. If they do, throw an error
    const checkMismatch = function(newID) {
      if (currentID && currentID !== newID) {
        throw new Error('Generated ID mismatch. Existing ID is ${currentID} and generated ID is ${newID');
      }
    }
    
    // detect fiberRoot (tag is 3 and return property is null)
    if (fiberNode.return === null && fiberNode.tag === 3 && fiberNode.index === 0) {
      fiberNode.deValtioID = '0,0';
      checkMismatch(fiberNode.deValtioID);
      return fiberNode.deValtioID;
    }

    // throw exception if return property has not been set and node isn't fiberRoot
    if (fiberNode.return === null) {
      throw new Error('node is not fiberRoot but return property is null.');
    }

    // get current depth by getting the depth of return and incrementing by one
    // let depth = Number(fiberNode.return.deValtioID.split(':').pop().split(',')[0]) + 1;

    // width is just the index property of the fiberNode
    // let width = fiberNode.index;

    // detect if current node is child of sibling
    if (fiberNode.return.deValtioID && fiberNode.return.index > 0) {
      const returnName = fiberNode.return.deValtioID;
      fiberNode.deValtioID = `${returnName}:1,${width}`;
      checkMismatch(fiberNode.deValtioID);
      return fiberNode.deValtioID;
    }

    // get depth by parsing name of return, adding one to the last depth, and appending the width
    let returnName = fiberNode.return.deValtioID;
    if (prevNode && fiberNode.return !== prevNode) returnName = prevNode.deValtioID;
    
    const splitReturnName = returnName.split(':');
    const returnNodeDepth = Number(splitReturnName.pop().split(',')[0]);
    const newName = splitReturnName.join(':') ? 
      splitReturnName.join(':') + ':' + (returnNodeDepth + 1) + ',' + width :
      (returnNodeDepth + 1) + ',' + width;
      
    fiberNode.deValtioID = newName;
    checkMismatch(fiberNode.deValtioID);
    return fiberNode.deValtioID;
  } catch (err) {
    console.dir(fiberNode);
    throw err;
  }  
}

const hijackFiberNodePrototype = () => {
  // check if we have a fiberRoot
  if (!fiberRoot) return false;
  
  // get FiberNode prototype object
  fiberNodePrototype = Object.getPrototypeOf(fiberRoot);

  newProperties = {
    
    _return: {
      value: null,
      writable: true,
      enumerable: false,
      configurable: true
    },

    return: {
      get: function() {
        return this._return;
      },
      set: function(fiber) {
        // check if return is set to null or anything else that's not a fiberNode
        if (!(fiber instanceof fiberNodePrototype.constructor)) {
          this._return = fiber;
          return this;
        }
        
        console.log(`return value being set on fiberNode`);
        if (this.deValtioID) {
          console.log(`this fiberNode already exists and has the name: ${this.deValtioID}`);
          console.log(`the return is being set to: ${getFiberNodeName(fiber)}`);
          console.dir(fiber);
        }
        this._return = fiber;

        if (fiber.deValtioID) {
          console.log(`return node has deValtioID (${fiber.deValtioID}) so pushing this to deValtioNodes`)
          generateDeValtioID(this, fiber);
          deValtioNodes.push(new DeValtioNode(this));
        }

        return this;
      }
    }
  };

  return Object.defineProperties(fiberNodePrototype, newProperties);
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    const getFiberRoot = () => {
      const reactRoots = [];
      document.querySelectorAll('*').forEach((node) => {
        if (node._reactRootContainer) reactRoots.push(node);
      });

      if (reactRoots[0]) {
        console.log(`React Root Found`);
        fiberRoot = reactRoots[0]._reactRootContainer._internalRoot.current;
        // repeating message to test comms with front end
        setInterval(() => window.postMessage({message: 'This is a React App'}), 2000)
      } return fiberRoot;
    };

    //tree parsing part.

    // climb initial Tree, add valtioID to fiberNode properties
    // we should only need to do this once per page load and, after that,
    // if we hijack the fiberNode constructor we can have the React Reconciler
    // generate DeValtioNodes on the fly.

    // valtioID format:
    // 0,0:
    
    const climbFiber = (fiberNode, callback, prevNode = null) => {
      callback(fiberNode, prevNode);

      // climb sibling
      try {
        if (fiberNode.sibling) climbFiber(fiberNode.sibling, callback, fiberNode);
      } catch (err) {
        console.log(`Recursive call to sibling node failed. Node before failed call is:`);
        console.dir(fiberNode);
        throw err;
      }
      // climb child
      try {
        if (fiberNode.child) climbFiber(fiberNode.child, callback, fiberNode);
      } catch (err) {
        console.log(`Recursive call to child node failed. Node before failed call is:`);
        console.dir(fiberNode);
        throw err;
      };
    }

    

    setTimeout(() => {
      fiberRoot = getFiberRoot();
      if (fiberRoot) {
        climbFiber(fiberRoot, (node, prevNode) => {
        prevNode ? generateDeValtioID(node, prevNode) : generateDeValtioID(node);
        deValtioNodes.push(new DeValtioNode(node));
        });
        sendToContentScript('deValtioTree', deValtioNodes);
        console.dir(deValtioNodes);
        console.log(`${deValtioNodes.length} fiberNodes found.`)
        console.log(`Number of nodes with props: ${deValtioNodes.filter(node => node.hasProps).length}`);
        console.log(`Number of nodes with state: ${deValtioNodes.filter(node => node.hasState).length}`);
        console.log(`Hijacking fiberNode prototype return property...`);
        hijackFiberNodePrototype();
      }
    }, 1000);
  }
};
