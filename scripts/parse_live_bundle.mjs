import fs from 'fs';

const bundle = fs.readFileSync('temp_extracted/_assets_index-ByDyvFzI.js', 'utf-8');

// Find all assets matching /assets/...
const assetRegex = /["'](\/assets\/[^"']+\.(?:jpg|jpeg|png|webp|svg|mp4|webm))["']/g;
const allAssets = new Set();
let m;
while ((m = assetRegex.exec(bundle)) !== null) {
  allAssets.add(m[1]);
}
console.log('Total asset URLs found in live bundle:', allAssets.size);

// Look for projects array or data structures
// Look for any string array or object containing project names
const projectKeywords = ['Mirum', 'Santa Clara', 'Nogales', 'Yala Suits', 'Bloom Garden', 'Cinco', 'Consultorio', 'Delirio'];
for (const kw of projectKeywords) {
  const idx = bundle.indexOf(kw);
  if (idx !== -1) {
    console.log(`Found keyword "${kw}" at index ${idx}`);
    console.log('Context:', bundle.substring(Math.max(0, idx - 100), Math.min(bundle.length, idx + 200)));
  }
}

// Find all image variable declarations: e.g. const X="/assets/..." or X="/assets/..."
const varAssetMap = {};
const varRegex = /\b([a-zA-Z0-9_$]+)\s*=\s*["'](\/assets\/[^"']+)["']/g;
while ((m = varRegex.exec(bundle)) !== null) {
  varAssetMap[m[1]] = m[2];
}
console.log('Total variable to asset mappings in live bundle:', Object.keys(varAssetMap).length);

// Also check for any other arrays of projects
const projArrayMatch = bundle.match(/\[\s*\{title:\s*["'][^"']+["'][\s\S]*?\}\s*\]/g);
if (projArrayMatch) {
  console.log(`Found ${projArrayMatch.length} project-like array(s)!`);
  projArrayMatch.forEach((arrStr, i) => {
    console.log(`Array ${i} length: ${arrStr.length}`);
  });
}
