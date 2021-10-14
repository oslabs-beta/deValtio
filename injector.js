console.log(`injector.js is running`);

// inject script into javascript context of tab
const injectedScript = document.createElement('script');
injectedScript.src = chrome.runtime.getURL('injected.js');
injectedScript.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(injectedScript);

let comms;

const sendToFrontEnd = async (messageHead, messageBody) => {
    if (comms) {
        comms.postMessage({messageHead, messageBody});
        return true;
    } else {
        return false;
    }
};

// set up listener to listen for messages from injected script
window.addEventListener('message', (e) => {
    if (e.data && e.data.deValtioMessage) {
        const [messageHead, messageBody] = e.data.deValtioMessage;
        console.log(`Received message from injected. Sending ${messageHead} front end with payload: ${JSON.stringify(messageBody)}`)
        messageSender = setInterval(async () => {
            let messageSent = await sendToFrontEnd(messageHead, messageBody);
            if (messageSent) {
                await clearInterval(messageSender);
                messageSender = null;
            } else {
                console.log(`Message sending from content script to front end failed. messageHead is: ${messageHead}`);
            }
        }, 1000);
    };
});

// creates connection between extension and content script
chrome.runtime.onConnect.addListener(port => {
    console.log('Content script is now connected to the Front End', port);
    comms = port;
}); 
