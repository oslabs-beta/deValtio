//loads chrome extension into the devtool panel

chrome.devtools.panels.create(
    "deValtio",
    null,
    "devToolPanel.html"
);