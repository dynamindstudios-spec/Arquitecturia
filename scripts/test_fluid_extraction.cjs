const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const testDir = path.resolve('temp_samples/test_fluid_sequence');
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

console.log('Testing extraction with zero dead zone:');
console.log('Part 1: hero_scrolly.mp4 from 0.0s to 8.5s -> 120 frames');
execSync(`ffmpeg -i "public/videos/hero_scrolly.mp4" -to 8.5 -vf "fps=120/8.5,scale=1280:720" -q:v 2 "${testDir}/f_%04d.jpg" -y`);

const part1Count = fs.readdirSync(testDir).filter(f => f.startsWith('f_')).length;
console.log('Part 1 extracted frames:', part1Count);

console.log('\nPart 2: scroll2.mp4 from 0.8s to 10.0s -> 120 frames');
const testDir2 = path.resolve('temp_samples/test_fluid_sequence_part2');
if (!fs.existsSync(testDir2)) fs.mkdirSync(testDir2, { recursive: true });
execSync(`ffmpeg -ss 0.8 -i "public/videos/scroll2.mp4" -to 9.2 -vf "fps=120/9.2,scale=1280:720" -q:v 2 "${testDir2}/f_%04d.jpg" -y`);

const part2Count = fs.readdirSync(testDir2).filter(f => f.startsWith('f_')).length;
console.log('Part 2 extracted frames:', part2Count);

// Check seam PSNR between last frame of Part 1 and first frame of Part 2
const lastP1 = path.join(testDir, `f_${String(part1Count).padStart(4, '0')}.jpg`);
const firstP2 = path.join(testDir2, 'f_0001.jpg');

const out = execSync(`ffmpeg -i "${lastP1}" -i "${firstP2}" -lavfi "psnr" -f null - 2>&1`, { encoding: 'utf-8' });
const m = out.match(/average:([0-9.]+)/);
console.log('\nSeam PSNR between Part 1 end and Part 2 start:', m ? m[1] : 'N/A', 'dB');
