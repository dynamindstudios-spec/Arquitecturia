const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const v1Dir = path.resolve('temp_samples/v1_all_frames');
const v2Dir = path.resolve('temp_samples/v2_all_frames');

console.log('Finding where v1 camera reaches the pool and where v2 camera starts moving...');

for (let f = 170; f <= 215; f += 5) {
  const pad = String(f).padStart(4, '0');
  const imgPath = path.join(v1Dir, `f_${pad}.jpg`);
  const out = execSync(`ffmpeg -i "${imgPath}" -i "${path.join(v1Dir, 'f_0240.jpg')}" -lavfi "psnr" -f null - 2>&1`, { encoding: 'utf-8' });
  const m = out.match(/average:([0-9.]+)/);
  console.log(`v1 f_${pad} vs f_0240: PSNR = ${m ? m[1] : 'N/A'} dB`);
}

console.log('\nIn v2, let\'s see when the camera starts moving past the initial position:');
for (let f = 1; f <= 40; f += 5) {
  const pad = String(f).padStart(4, '0');
  const imgPath = path.join(v2Dir, `f_${pad}.jpg`);
  const out = execSync(`ffmpeg -i "${path.join(v2Dir, 'f_0001.jpg')}" -i "${imgPath}" -lavfi "psnr" -f null - 2>&1`, { encoding: 'utf-8' });
  const m = out.match(/average:([0-9.]+)/);
  console.log(`v2 f_0001 vs f_${pad}: PSNR = ${m ? m[1] : 'N/A'} dB`);
}
