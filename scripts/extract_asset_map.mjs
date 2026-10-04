import fs from 'fs';
import path from 'path';

const bundleJs = fs.readFileSync('temp_extracted/bundle.js', 'utf8');

// Find variable definitions like:  const ab="/assets/...", cd="/assets/..."
// or var ... or let ...
const assetMap = {};
// Match all variable assignments of string literals containing "/assets/" or "http"
const varRegex = /([a-zA-Z0-9_$]+)\s*=\s*["'](\/assets\/[^"']+|https?:\/\/[^"']+)["']/g;
let m;
while ((m = varRegex.exec(bundleJs)) !== null) {
  assetMap[m[1]] = m[2];
}

console.log(`Mapped ${Object.keys(assetMap).length} asset variables.`);

// Look around 431000 for the projects array
const sub = bundleJs.substring(428000, 440000);

// Let's also look for all objects with title, category, etc.
// Let's print out the exact slice around 430500 to 435000
fs.writeFileSync('temp_extracted/bundle_slice_projects.js', bundleJs.substring(430000, 436000), 'utf8');

console.log('Saved bundle_slice_projects.js. Let us inspect it.');
