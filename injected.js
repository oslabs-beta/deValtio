document.onreadystatechange = () => {
  if (document.readyState === 'complete') {

    const reactRoots = [];
    document.querySelectorAll('*').forEach(node => {
      if (node._reactRootContainer) reactRoots.push(node);
    });

    if (reactRoots[0]) {
      console.log(`React Root Found`);
      setInterval(() => window.postMessage({message: 'This is a React Apps'}), 2000)
      
    };
  }
};