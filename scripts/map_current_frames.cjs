const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.resolve('public/scrolly_frames');
const v1Dir = path.resolve('temp_samples/v1_all_frames');
const v2Dir = path.resolve('temp_samples/v2_all_frames');

console.log('Mapping scrolly_frames against v1 and v2...');

// Test every 10th frame in public/scrolly_frames
for (let i = 1; i <= 240; i += 10) {
  const pad = String(i).padStart(4, '0');
  const framePath = path.join(dir, `frame_${pad}.webp`);
  
  // Compare with v1 at i * 2 or similar
  // Let's find best match in v1 or v2
  let bestMatch = '';
  let bestPsnr = 0;

  // Test v1
  for (let f = Math.max(1, (i - 10) * 2); f <= Math.min(240, (i + 10) * 2); f += 2) {
    const fPad = String(f).padStart(4, '0');
    const v1Path = path.join(v1Dir, `f_${fPad}.jpg`);
    if (fs.existsSync(v1Path)) {
      try {
        const out = execSync(`ffmpeg -i "${framePath}" -i "${v1Path}" -lavfi "psnr" -f null - 2>&1`, { encoding: 'utf-8' });
        const m = out.match(/average:([0-9.]+)/);
        const psnr = m ? parseFloat(m[1]) : 0;
        if (psnr > bestPsnr) {
          bestPsnr = psnr;
          bestMatch = `v1 f_${fPad}`;
        }
      } catch (e) {}
    }
  }

  // Test v2
  for (let f = Math.max(1, (i - 120 - 10) * 2); f <= Math.min(240, (i - 120 + 10) * 2); f += 2) {
    const fPad = String(f).padStart(4, '0');
    const v2Path = path.join(v2Dir, `f_${fPad}.jpg`);
    if (fs.existsSync(v2Path)) {
      try {
        const out = execSync(`ffmpeg -i "${framePath}" -i "${v2Path}" -lavfi "psnr" -f null - 2>&1`, { encoding: 'utf-8' });
        const m = out.match(/average:([0-9.]+)/);
        const psnr = m ? parseFloat(m[1]) : 0;
        if (psnr > bestPsnr) {
          bestPsnr = psnr;
          bestMatch = `v2 f_${fPad}`;
        }
      } catch (e) {}
    }
  }

  console.log(`scrolly_frame ${pad} matches ${bestMatch} with PSNR=${bestPsnr.toFixed(1)} dB`);
}
