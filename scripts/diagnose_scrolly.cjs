const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const v1 = path.resolve('public/videos/hero_scrolly.mp4');
const v2 = path.resolve('public/videos/scroll2.mp4');

const tmpDir = path.resolve('temp_samples');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

// Extract sample frames every 2 seconds from v1 and v2
console.log('Extracting sample frames from v1...');
for (let s = 0; s <= 10; s += 2) {
  const outPath = path.join(tmpDir, `v1_${s}s.jpg`);
  execSync(`ffmpeg -ss ${s} -i "${v1}" -frames:v 1 -q:v 2 "${outPath}" -y`);
  console.log(`v1 at ${s}s:`, fs.statSync(outPath).size, 'bytes');
}

console.log('Extracting sample frames from v2...');
for (let s = 0; s <= 10; s += 2) {
  const outPath = path.join(tmpDir, `v2_${s}s.jpg`);
  execSync(`ffmpeg -ss ${s} -i "${v2}" -frames:v 1 -q:v 2 "${outPath}" -y`);
  console.log(`v2 at ${s}s:`, fs.statSync(outPath).size, 'bytes');
}

// Compare frame sizes in public/scrolly_frames from 1 to 240
const scrollyDir = path.resolve('public/scrolly_frames');
const frames = fs.readdirSync(scrollyDir).filter(f => f.endsWith('.webp')).sort();
console.log('Total scrolly frames in folder:', frames.length);

