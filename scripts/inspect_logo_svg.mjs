import fs from 'fs';

const bundle = fs.readFileSync('temp_extracted/bundle.js', 'utf8');

// Find all logo references
const matches = [];
let idx = 0;
while ((idx = bundle.indexOf('logo-simetria', idx)) !== -1) {
  matches.push(bundle.substring(Math.max(0, idx - 50), Math.min(bundle.length, idx + 100)));
  idx += 13;
}

console.log('Logo matches:', matches);

// Check if there are SVG paths
const pathMatches = bundle.match(/d:\s*["']([MmLlHhVvCcSsQqTtAaZz0-9\s,.-]{20,})["']/g);
console.log('Path matches count:', pathMatches ? pathMatches.length : 0);
