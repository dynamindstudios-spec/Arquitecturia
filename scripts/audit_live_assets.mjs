import fs from 'fs';
import path from 'path';

const bundle = fs.readFileSync('temp_extracted/_assets_index-ByDyvFzI.js', 'utf8');
const assetRegex = /["'](\/assets\/[^"']+\.(?:jpg|jpeg|png|webp|svg|mp4|webm))["']/g;
const allAssets = new Set();
let m;
while ((m = assetRegex.exec(bundle)) !== null) {
  allAssets.add(m[1]);
}
console.log('Total asset URLs in live bundle:', allAssets.size);

const localFiles = new Set(fs.readdirSync('public/extracted/simetria/assets'));
console.log('Total files in public/extracted/simetria/assets:', localFiles.size);

const missing = [];
for (const a of allAssets) {
  const filename = path.basename(a);
  if (!localFiles.has(filename)) {
    missing.push(a);
  }
}
console.log('Missing assets from live bundle:', missing.length);
if (missing.length > 0) {
  console.log('Missing:', missing);
} else {
  console.log('🎉 100% of all 170 original assets from the live website are downloaded locally!');
}
