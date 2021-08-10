//loads chrome extension into the devtool panel

chrome.devtools.panels.create(
    "deValtio",
    null,
    "devTools.html",
    () => console.log('devtool created')
);