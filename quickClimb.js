const getRoots = (elem = document) => {
  const reactRoots = [];
  document.querySelectorAll('*').forEach(node => {
    if (node._reactRootContainer) reactRoots.push(node);
  });
  return reactRoots;
};

const getHostRoot = reactNode => reactNode._reactRootContainer._internalRoot.current;

class TreeNode {
  constructor() {
    this.name = null;
    this.tag = null;
    this.children = [];
    // this.sourceCode = null;
  }
}

const tags = ["FunctionComponent", "ClassComponent", "IndeterminateComponent", "HostRoot", "HostPortal", "HostComponent", "HostText", "Fragment", "Mode", "ContextConsumer", "ContextProvider", "ForwardRef", "Profiler", "SuspenseComponent", "MemoComponent", "SimpleMemoComponent", "LazyComponent"];

climb = (node, parentTreeNode = null) => {
  let treeNode = new TreeNode();
  treeNode.name = tags[node.tag];
  // treeNode.sourceCode = node.type? node.type.toString() : null;
  treeNode.tag = node.tag;
  treeNode.type = node.type;
  
  if (node.sibling) {
    if (parentTreeNode) parentTreeNode.children.push(climb(node.sibling));
  };

  if (node.child) {
    treeNode.children.push(climb(node.child, treeNode))
  }
  return treeNode;
};

roots = getRoots();

hostRoot = getHostRoot(roots[0]);

console.log(roots);

tree = climb(hostRoot);

console.log(JSON.stringify(tree, null, 2))

console.dir(tree)