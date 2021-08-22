// bypassing "isolated world" restrictions
// source: https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions

let s = document.createElement('script');
s.src = chrome.runtime.getURL('reactClimber.js');
s.defer = true;
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);