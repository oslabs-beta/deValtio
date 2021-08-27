//loads chrome extension into the devtool panel

chrome.devtools.panels.create(
    "deValtio",
    null,
    "index.html",
    () => console.log('devtool created')
);