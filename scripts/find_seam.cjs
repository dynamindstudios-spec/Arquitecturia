const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const v1Dir = path.resolve('temp_samples/v1_all_frames');
const v2Dir = path.resolve('temp_samples/v2_all_frames');

console.log('Comparing v1 frames 180..240 against v2 frame 1 (f_0001.jpg)...');

const v2First = path.join(v2Dir, 'f_0001.jpg');

let bestFrame = -1;
let highestPsnr = 0;

for (let i = 180; i <= 240; i += 5) {
  const pad = String(i).padStart(4, '0');
  const v1Frame = path.join(v1Dir, `f_${pad}.jpg`);
  try {
    const out = execSync(`ffmpeg -i "${v1Frame}" -i "${v2First}" -lavfi "psnr" -f null - 2>&1`, { encoding: 'utf-8' });
    const match = out.match(/average:([0-9.]+)/);
    const psnr = match ? parseFloat(match[1]) : 0;
    console.log(`v1 Frame ${i} vs v2 Frame 1: PSNR=${psnr.toFixed(2)} dB`);
    if (psnr > highestPsnr) {
      highestPsnr = psnr;
      bestFrame = i;
    }
  } catch (e) {}
}

console.log(`\nBest match: v1 frame ${bestFrame} with PSNR=${highestPsnr.toFixed(2)} dB`);
