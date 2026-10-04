const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const v1Dir = path.resolve('temp_samples/v1_all_frames');
const v2Dir = path.resolve('temp_samples/v2_all_frames');

// Let's check the top-left or building area (which is rigid, static when camera stops)
// We can crop the buildings area (top center) and compare consecutive frames!
// If camera is moving forward, the buildings grow/scale. If camera is stopped, the buildings are 100% pixel-identical!

console.log('Comparing cropped building region across v1 frames to find exact camera stop frame...');

// Crop x=700, y=300, w=500, h=300 (the central buildings)
const cropDir = path.resolve('temp_samples/crop_buildings');
if (!fs.existsSync(cropDir)) fs.mkdirSync(cropDir, { recursive: true });

for (let f = 150; f <= 240; f += 5) {
  const pad = String(f).padStart(4, '0');
  execSync(`ffmpeg -i "${v1Dir}/f_${pad}.jpg" -filter:v "crop=500:300:700:300" -q:v 2 "${cropDir}/c_${pad}.jpg" -y`);
}

for (let f = 150; f < 240; f += 5) {
  const p1 = String(f).padStart(4, '0');
  const p2 = String(f + 5).padStart(4, '0');
  const out = execSync(`ffmpeg -i "${cropDir}/c_${p1}.jpg" -i "${cropDir}/c_${p2}.jpg" -lavfi "psnr" -f null - 2>&1`, { encoding: 'utf-8' });
  const m = out.match(/average:([0-9.]+)/);
  console.log(`v1 Crop ${p1} to ${p2}: PSNR = ${m ? m[1] : 'N/A'} dB`);
}
