const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Extract all 240 frames of hero_scrolly.mp4 into a temp folder at 24fps
const v1Dir = path.resolve('temp_samples/v1_all_frames');
if (!fs.existsSync(v1Dir)) fs.mkdirSync(v1Dir, { recursive: true });

console.log('Extracting all frames from hero_scrolly.mp4...');
execSync(`ffmpeg -i "public/videos/hero_scrolly.mp4" -vf "fps=24" -q:v 2 "${v1Dir}/f_%04d.jpg" -y`);

const v1Files = fs.readdirSync(v1Dir).filter(f => f.endsWith('.jpg')).sort();
console.log('Total extracted frames from hero_scrolly:', v1Files.length);

// Compare consecutive frame sizes and differences
let lastActiveFrame = 0;
for (let i = 1; i < v1Files.length; i++) {
  const fPrev = path.join(v1Dir, v1Files[i-1]);
  const fCurr = path.join(v1Dir, v1Files[i]);
  // Use ffmpeg lavfi to compute PSNR between fPrev and fCurr
  try {
    const out = execSync(`ffmpeg -i "${fPrev}" -i "${fCurr}" -lavfi "psnr" -f null - 2>&1`, { encoding: 'utf-8' });
    const match = out.match(/average:([0-9.]+)/);
    const psnr = match ? parseFloat(match[1]) : 0;
    // If PSNR > 45 or 50, frames are essentially identical (no motion)
    if (psnr < 45) {
      lastActiveFrame = i + 1;
    }
    if (i % 20 === 0 || psnr > 40) {
      console.log(`v1 Frame ${i} to ${i+1}: PSNR=${psnr.toFixed(2)} dB ${psnr > 45 ? '(STATIC/FREEZE)' : '(MOVING)'}`);
    }
  } catch (e) {
    // Ignore
  }
}

console.log('Last active moving frame in hero_scrolly.mp4:', lastActiveFrame, 'out of', v1Files.length);
