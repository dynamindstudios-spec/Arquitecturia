const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dir = path.resolve('public/scrolly_frames');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp')).sort();
console.log('Total files:', files.length);

const hashes = [];
for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const p = path.join(dir, f);
  const buf = fs.readFileSync(p);
  const hash = crypto.createHash('md5').update(buf).digest('hex');
  const size = buf.length;
  hashes.push({ name: f, index: i + 1, size, hash });
}

console.log('Checking for identical consecutive frames...');
let duplicates = [];
for (let i = 1; i < hashes.length; i++) {
  if (hashes[i].hash === hashes[i-1].hash) {
    duplicates.push([hashes[i-1].name, hashes[i].name]);
  }
}
console.log('Exact duplicate consecutive frames count:', duplicates.length);
if (duplicates.length > 0) {
  console.log('Duplicates:', duplicates.slice(0, 10));
}

// Print samples every 10 frames
console.log('\nFrame progression:');
for (let i = 0; i < hashes.length; i += 10) {
  const h = hashes[i];
  console.log(`Frame ${h.index} (${h.name}): ${h.size} bytes, hash: ${h.hash.substring(0, 8)}`);
}
