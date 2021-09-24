console.log(`injector.js is running`);

// inject script into javascript context of tab
const injectedScript = document.createElement('script');
injectedScript.src = chrome.runtime.getURL('injected.js');
injectedScript.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(injectedScript);

let comms;

// connects injected script
window.addEventListener('message', (e) => {
    if (e.data.message === 'This is a React App') console.log(e.data.message);
    if (comms) {
        comms.postMessage({
            message: 'fromm window' + e.data.message
        });
    }
});


// creates connection between extension and content script
chrome.runtime.onConnect.addListener(port => {
    console.log('connected ', port);
    comms = port;
    port.postMessage({
        message: 'from content script'
    });
    
    port.onMessage.addListener((message) => {
        if (message) {
            console.log('received in content', message)
        }
    });
}); 