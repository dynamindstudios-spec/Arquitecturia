import fs from 'fs';

const bundleJs = fs.readFileSync('temp_extracted/bundle.js', 'utf8');
const vars = ['aL', 'lL', 'uL', 'cL', 'fL', 'mL', 'K2'];
for (const v of vars) {
  const m = bundleJs.match(new RegExp(`\\b${v}\\s*=\\s*["']([^"']+)["']`));
  if (m) {
    console.log(`${v} = ${m[1]}`);
  }
}
