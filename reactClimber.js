const pp = (stuff) => console.log(JSON.stringify(stuff, null, 2));

pp(`Running reactClimber.js`);

document.onload = function(){

// grab every react node in document
const reactRoots = [];
document.querySelectorAll('*').forEach(node => {
for (const key in node) {
  if (key.startsWith('_reactRootContainer')) {
    reactRoots.push(node);
    break;
    }
    }
  })

let sampleRoot = reactRoots[0]
pp(`reactRoots is ${reactRoots.map(root => root.nodeName)}`);
if (sampleRoot) pp(`Reflect.ownKeys(sampleRoot) is ${Reflect.ownKeys(sampleRoot)}`);

};