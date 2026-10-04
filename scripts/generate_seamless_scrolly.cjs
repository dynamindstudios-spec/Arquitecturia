const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const publicDir = path.resolve('public/scrolly_frames');
const distDir = path.resolve('dist/scrolly_frames');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const tempDir1 = path.resolve('temp_samples/seamless_p1');
const tempDir2 = path.resolve('temp_samples/seamless_p2');

if (!fs.existsSync(tempDir1)) fs.mkdirSync(tempDir1, { recursive: true });
if (!fs.existsSync(tempDir2)) fs.mkdirSync(tempDir2, { recursive: true });

console.log('1. Extracting Part 1 (hero_scrolly.mp4, 0.0s to 8.5s) -> 120 frames WebP...');
execSync(`ffmpeg -i "public/videos/hero_scrolly.mp4" -to 8.5 -vf "fps=120/8.5,scale=1280:720" -c:v libwebp -quality 82 -compression_level 4 "${tempDir1}/frame_%04d.webp" -y`);

const p1Files = fs.readdirSync(tempDir1).filter(f => f.endsWith('.webp')).sort();
console.log(`Part 1 extracted ${p1Files.length} frames.`);

console.log('2. Extracting Part 2 (scroll2.mp4, 0.8s to 10.0s) -> 120 frames WebP...');
execSync(`ffmpeg -ss 0.8 -i "public/videos/scroll2.mp4" -to 9.2 -vf "fps=120/9.2,scale=1280:720" -c:v libwebp -quality 82 -compression_level 4 "${tempDir2}/frame_%04d.webp" -y`);

const p2Files = fs.readdirSync(tempDir2).filter(f => f.endsWith('.webp')).sort();
console.log(`Part 2 extracted ${p2Files.length} frames.`);

// Ensure exactly 120 frames in each part
const p1Selected = p1Files.slice(0, 120);
const p2Selected = p2Files.slice(0, 120);

console.log('3. Writing seamless 240 frames to public/scrolly_frames and dist/scrolly_frames...');

// Copy Part 1 as frames 0001 to 0120
for (let i = 0; i < 120; i++) {
  const targetNum = String(i + 1).padStart(4, '0');
  const src = path.join(tempDir1, p1Selected[i]);
  const destPublic = path.join(publicDir, `frame_${targetNum}.webp`);
  const destDist = path.join(distDir, `frame_${targetNum}.webp`);
  fs.copyFileSync(src, destPublic);
  fs.copyFileSync(src, destDist);
}

// Copy Part 2 as frames 0121 to 0240
for (let i = 0; i < 120; i++) {
  const targetNum = String(i + 121).padStart(4, '0');
  const src = path.join(tempDir2, p2Selected[i]);
  const destPublic = path.join(publicDir, `frame_${targetNum}.webp`);
  const destDist = path.join(distDir, `frame_${targetNum}.webp`);
  fs.copyFileSync(src, destPublic);
  fs.copyFileSync(src, destDist);
}

const finalCount = fs.readdirSync(publicDir).filter(f => f.endsWith('.webp')).length;
console.log(`Successfully written ${finalCount} seamless frames to public and dist!`);
