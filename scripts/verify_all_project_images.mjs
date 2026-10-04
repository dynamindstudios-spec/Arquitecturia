import fs from 'fs';
import path from 'path';

const content = fs.readFileSync('src/data/projectsData.js', 'utf8');

// Match all "/extracted/simetria/assets/..." strings
const regex = /["'](\/extracted\/simetria\/assets\/[^"']+)["']/g;
const urls = new Set();
let m;
while ((m = regex.exec(content)) !== null) {
  urls.add(m[1]);
}

console.log(`Total unique image paths in projectsData.js: ${urls.size}`);

let missingOnDisk = [];
for (const u of urls) {
  const localPath = path.resolve('public' + u);
  if (!fs.existsSync(localPath)) {
    missingOnDisk.push(u);
  }
}

console.log(`Missing on disk in public/: ${missingOnDisk.length}`);
if (missingOnDisk.length > 0) {
  console.log('Missing:', missingOnDisk);
} else {
  console.log('All image paths exist on disk in public/!');
}
