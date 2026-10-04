import fs from 'fs';

const bundleJs = fs.readFileSync('temp_extracted/bundle.js', 'utf8');

// Find definition of yh and oL
const yhMatch = bundleJs.match(/yh\s*=\s*\[([^\]]+)\]/);
if (yhMatch) {
  console.log('yh variables:', yhMatch[1]);
}
const olMatch = bundleJs.match(/oL\s*=\s*["']([^"']+)["']/);
if (olMatch) {
  console.log('oL asset:', olMatch[1]);
}
