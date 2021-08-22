console.log(`background.js is running`);

// chrome.runtime.onMessage.addListener(
//   function(message, callback) {
//     if (message == "runContentScript"){
//       chrome.tabs.executeScript({
//         file: '../content_scripts/proxyHugger.js'
//       });
//     }
//   });

//console.log(pp(chrome.debugger.getTargets))