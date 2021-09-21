console.log(`injected.js has been initiated`)

document.onreadystatechange = () => {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {

    const reactRoots = [];
    document.querySelectorAll('*').forEach(node => {
      if (node._reactRootContainer) reactRoots.push(node);
    });

    if (reactRoots[0]) {
      console.log(`React Root Found`);
    };
  }
};