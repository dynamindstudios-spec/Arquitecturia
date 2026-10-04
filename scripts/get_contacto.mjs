import fs from 'fs';

const bundleJs = fs.readFileSync('temp_extracted/bundle.js', 'utf8');
const idx = bundleJs.indexOf('qF=()=>');
if (idx !== -1) {
  console.log(bundleJs.substring(idx, idx + 2500));
}
