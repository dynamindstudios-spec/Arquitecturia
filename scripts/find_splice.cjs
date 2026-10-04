const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const v1Dir = path.resolve('temp_samples/v1_all_frames');
const v2Dir = path.resolve('temp_samples/v2_all_frames');

// Let's test splicing v1 at frame X (from 180 to 240) and v2 at frame Y (from 1 to 30)
// To find the smoothest velocity match where the camera continues moving forward with constant speed!

console.log('Testing splice points between v1 and v2...');

const v1Cuts = [190, 200, 210, 220, 230, 240];
const v2Starts = [1, 5, 10, 15, 20, 25];

for (const cut1 of v1Cuts) {
  for (const start2 of v2Starts) {
    const p1 = String(cut1).padStart(4, '0');
    const p2 = String(start2).padStart(4, '0');
    const f1 = path.join(v1Dir, `f_${p1}.jpg`);
    const f2 = path.join(v2Dir, `f_${p2}.jpg`);
    try {
      const out = execSync(`ffmpeg -i "${f1}" -i "${f2}" -lavfi "psnr" -f null - 2>&1`, { encoding: 'utf-8' });
      const m = out.match(/average:([0-9.]+)/);
      const psnr = m ? parseFloat(m[1]) : 0;
      if (psnr > 18) {
        console.log(`v1[${cut1}] -> v2[${start2}]: PSNR = ${psnr.toFixed(2)} dB`);
      }
    } catch (e) {}
  }
}
