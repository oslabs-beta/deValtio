console.log(`injector.js is running`);

// inject script into javascript context of tab
const injectedScript = document.createElement('script');
injectedScript.src = chrome.runtime.getURL('injected.js');
injectedScript.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(injectedScript);

// attempt to see if we can read JS context from the content script without
// injected script or inspectedWindow eval
// document.onreadystatechange = () => {
//   if (document.readyState === 'interactive' || document.readyState === 'complete') {

//     const reactRoots = [];
//     document.querySelectorAll('*').forEach(node => {
//       if (node._reactRootContainer) reactRoots.push(node);
//     });

//     if (reactRoots[0]) {
//       console.log(`React Root Found`);
//     };
//   }
// };

// communication with front end
// chrome.runtime.onConnect.addListener(port => {
//     console.log('connected ', port);
// })
// const port = chrome.runtime.connect({name: "deValtio"});
// port.postMessage({message: "Test Message"});
// port.onMessage.addListener(msg => console.log(`Content script received following message: ${msg}`));

// chrome.runtime.connect({name: "deValtio"});

chrome.runtime.onConnect.addListener(port => {
    console.log('connected ', port);
  
    port.postMessage({
        message: 'from content script'
    });
  
    port.onMessage.addListener((message) => {
        if (message) {
            console.log('received in content', message)
        }
    });
}); 