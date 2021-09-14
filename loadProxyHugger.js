// bypassing "isolated world" restrictions
// source: https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions

var s = document.createElement('script');
s.src = chrome.runtime.getURL('proxyHugger.js');
s.async = true;
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);