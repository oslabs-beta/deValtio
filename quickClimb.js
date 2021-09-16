const getRoots = (elem = document) => {
  const reactRoots = [];
  document.querySelectorAll('*').forEach(node => {
    if (node._reactRootContainer) reactRoots.push(node);
  });
  return reactRoots;
};

const getHostRoot = reactNode => reactNode._reactRootContainer._internalRoot.current;

const getFiberNodeName = (node) => {

  console.dir(node)
  
  if (node.tag === 3) return 'fiberRoot';
  
  if (node.tag === 0) return node.type.name;

  if (node.tag === 5) {
    return node.stateNode.className ? `${node.type}.${node.stateNode.className}` : node.type;
  }

  if (typeof node.type === 'string') return node.type;
  if (typeof node.type === 'function') return node.type.name;
  if (typeof node.type === 'symbol') return node.type.toString();

}

class TreeNode {
  constructor(node) {
    this.tag = node.tag;
    this.name = getFiberNodeName(node);
    this.tagName = tagNames[node.tag]
    this.type = node.type;
    this.children = [];
    // this.sourceCode = node.type? node.type.toString() : null;
  }
}

const tagNames = ["FunctionComponent", "ClassComponent", "IndeterminateComponent", "HostRoot", "HostPortal", "HostComponent", "HostText", "Fragment", "Mode", "ContextConsumer", "ContextProvider", "ForwardRef", "Profiler", "SuspenseComponent", "MemoComponent", "SimpleMemoComponent", "LazyComponent"];

climb = (node, parentTreeNode = null) => {
  
  let treeNode = new TreeNode(node);
  
  if (node.sibling) {
    parentTreeNode.children.push(climb(node.sibling, parentTreeNode));
  };

  if (node.child) {
    treeNode.children.push(climb(node.child, treeNode))
  }
  return treeNode;
};

roots = getRoots();

hostRoot = getHostRoot(roots[0]);

console.log(roots);

let tree = climb(hostRoot);

console.log(JSON.stringify(tree, null, 2))

console.dir(tree)