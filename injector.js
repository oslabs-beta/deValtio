console.log(`injector.js is running`);

// inject script into javascript context of tab
const injectedScript = document.createElement('script');
injectedScript.src = chrome.runtime.getURL('injected.js');
injectedScript.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(injectedScript);

let comms;

const sendToFrontEnd = (messageHead, messageBody) => {
    if (comms) {
        comms.postMessage({messageHead, messageBody});
        return true;
    } else {
        return false;
    }
};

// set up listener to listen for messages from injected script
window.addEventListener('deValtioMessage', (e) => {
    const [messageHead, messageBody] = e.data.deValtioMessage;
    sendToFrontEnd(messageHead, messageBody);
});

// creates connection between extension and content script
chrome.runtime.onConnect.addListener(port => {
    console.log('Content script is now connected to the Front End', port);
    comms = port;
}); 
