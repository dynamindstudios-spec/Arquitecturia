const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const v2Dir = path.resolve('temp_samples/v2_all_frames');
if (!fs.existsSync(v2Dir)) fs.mkdirSync(v2Dir, { recursive: true });

console.log('Extracting all frames from scroll2.mp4...');
execSync(`ffmpeg -i "public/videos/scroll2.mp4" -vf "fps=24" -q:v 2 "${v2Dir}/f_%04d.jpg" -y`);

const v2Files = fs.readdirSync(v2Dir).filter(f => f.endsWith('.jpg')).sort();
console.log('Total extracted frames from scroll2:', v2Files.length);

// Check differences in v2 from frame 1 to 50
for (let i = 1; i <= 60; i += 10) {
  const fPrev = path.join(v2Dir, v2Files[i-1]);
  const fCurr = path.join(v2Dir, v2Files[i]);
  try {
    const out = execSync(`ffmpeg -i "${fPrev}" -i "${fCurr}" -lavfi "psnr" -f null - 2>&1`, { encoding: 'utf-8' });
    const match = out.match(/average:([0-9.]+)/);
    const psnr = match ? parseFloat(match[1]) : 0;
    console.log(`v2 Frame ${i} to ${i+1}: PSNR=${psnr.toFixed(2)} dB`);
  } catch (e) {}
}
