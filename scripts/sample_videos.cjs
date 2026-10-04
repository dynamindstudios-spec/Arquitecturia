const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('temp_samples');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

console.log('Sampling hero_scrolly.mp4...');
for (let s = 0; s < 10; s++) {
  const out = path.join(outDir, `hero_${s}s.jpg`);
  execSync(`ffmpeg -ss ${s} -i "public/videos/hero_scrolly.mp4" -frames:v 1 -q:v 2 "${out}" -y`);
  console.log(`hero_${s}s.jpg extracted (${fs.statSync(out).size} bytes)`);
}

console.log('\nSampling scroll2.mp4...');
for (let s = 0; s < 10; s++) {
  const out = path.join(outDir, `scroll2_${s}s.jpg`);
  execSync(`ffmpeg -ss ${s} -i "public/videos/scroll2.mp4" -frames:v 1 -q:v 2 "${out}" -y`);
  console.log(`scroll2_${s}s.jpg extracted (${fs.statSync(out).size} bytes)`);
}
