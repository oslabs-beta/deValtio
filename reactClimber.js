const VERBOSE = true;

const getReactRootKey = (node) => {
 for (const key in node) {
  if (key.startsWith('_reactRoot')) return [node, key];
 }
};

const reactRootsMap = new Map();

const documentObserver = new MutationObserver(documentObserverCallback);

const documentObserverOptions = {
  childList: true,
  attributes: true,
  characterData: false,
  // subtree: true,
  subtree: false,
  // attributeFilter: [],
  attributeOldValue: false,
  characterDataOldValue: false
}

function documentObserverCallback(mutationArray, observer) {
 mutationArray.forEach(mutation => {
  if (mutation.type === 'childList') {
    const node = mutation.target;
    console.log(`${node.id || node.className || node.nodeName}`);
    const reactRootKey = getReactRootKey(node);
    if (reactRootKey) {
      if (VERBOSE) console.log(`React Root found. Key is: ${reactRootKey[1]}. identifier is ${node.id || node.className || node.nodeName}`);
      reactRootsMap.set(reactRootKey[0], reactRootKey[1]);
    }
    // if (mutation.addedNodes) {
    //   mutation.addedNodes.forEach(node => {
    //     const reactRootKey = getReactRootKey(node);
    //     if (reactRootKey) {
    //       if (VERBOSE) console.log(`React Root found. Key is: ${reactRootKey[1]}. id is ${node.id}`);
    //       reactRootsMap.set(reactRootKey[0], reactRootKey[1]);
    //     } else {console.log(`${node.id || node.className || node.nodeName} added`)}
    //   }) // end iteration over added nodes
    // }
    // if (mutation.removedNodes) {
    //   mutation.removedNodes.forEach(node => {
    //     console.log(`${node.id || node.className || node.nodeName} has been removed`)
    //     if (reactRootsMap.has(node)) {
    //       const reactRootKeyValue = reactRootMap.get(node);
    //       const deletedId = node.id;
    //       reactRootsMap.delete(node);
    //       if (VERBOSE) console.log(`reactRoot with the key of ${reactRootKeyValue} and id ${deletedId} has been either removed or updated.`)
    //     }
    //   }) // end iteration over removed nodes
    // }
  }
 })
};

const documentNode = document.documentElement;

documentObserver.observe(documentNode, documentObserverOptions);