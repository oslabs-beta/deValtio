let VERBOSE = true;
let internalRoot;
reactRoots = [];
document.querySelectorAll('div').forEach(node => {
  if (node._reactRootContainer) reactRoots.push(node);
});

if (reactRoots[0]) {
  internalRoot = reactRoots[0]._reactRootContainer._internalRoot;
}

possibleValtioStores = [];
possibleUseSnapshotFuncs = [];
definiteValtioStores = [];
definiteUseSnapshotFuncs = [];

const climbFiber = (fiberNode, callback, prevNode=null) => {
  if (VERBOSE) console.log(`Executing callback on found node`);
  callback(fiberNode, prevNode);

  // climb child
  try {
    if (fiberNode.child) climbFiber(fiberNode.child, callback, fiberNode);
  } catch (err) {
    console.log(`Recursive call to child node failed. Node before failed call is:`);
    console.dir(fiberNode);
    throw err;
  };

  // climb sibling
  try {
    if (fiberNode.sibling) climbFiber(fiberNode.sibling, callback, fiberNode);
  } catch (err) {
    console.log(`Recursive call to sibling node failed. Node before failed call is:`);
    console.dir(fiberNode);
    throw err;
  };
}

const effectsParse = (effect) => {
  if (effect.create && effect.create.name === 'useSnapshot') {
    console.log(`useSnapshot found!`);
    definiteUseSnapshotFuncs.push(effect.create);
    definiteValtioStores.push(effect.deps);
    // return true;
  }

  // check if dependencies exist
  if (effect.deps) {
    
    // check if deps is Array and has only one element
    if (Array.isArray(effect.deps) && effect.deps.length === 1) {
          
      // check if the first element has a Valtio version prop
      if (effect.deps[0].version) {
        console.log(`deps with version exists. version is ${effect.deps[0].version}`);
        possibleValtioStores.push(effect.deps[0]);
        possibleUseSnapshotFuncs.push(effect.create);
        // return true;
      }
    }
  }

  // check if next exists
  if (effect.next) {
    effectsParse(effect.next);
  }
};

const findStores = (internalRoot) => {
  const current = internalRoot.current;

  climbFiber(current, (node) => {
    if (node.updateQueue && node.updateQueue.lastEffect) {
      // console.log(`updateQueue.lastEffect found!`)
      effectsParse(node.updateQueue.lastEffect);
    }
  })
}

findStores(internalRoot);