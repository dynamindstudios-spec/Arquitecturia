const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.resolve('public/scrolly_frames');

// Let's use ffmpeg or pixel difference to check motion between frames
// We can use ffmpeg lavfi "ssim" or "psnr" or simply compare compressed webp sizes or sample frames
console.log('Sampling scrolly_frames every 15 frames into temp_samples/debug_frame_XX.jpg');

const framesToSample = [1, 30, 60, 80, 90, 100, 110, 115, 120, 121, 130, 140, 160, 180, 200, 220, 240];

for (const num of framesToSample) {
  const pad = String(num).padStart(4, '0');
  const webpPath = path.join(dir, `frame_${pad}.webp`);
  const jpgPath = path.resolve(`temp_samples/debug_frame_${pad}.jpg`);
  execSync(`ffmpeg -i "${webpPath}" -q:v 2 "${jpgPath}" -y`);
  console.log(`Exported debug_frame_${pad}.jpg`);
}
