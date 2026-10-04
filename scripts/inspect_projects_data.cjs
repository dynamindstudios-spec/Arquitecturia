const fs = require('fs');
const path = require('path');

const manifestPath = path.resolve('public/extracted/simetria/all_projects_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// We can read src/data/projectsData.js
const pDataContent = fs.readFileSync('src/data/projectsData.js', 'utf8');

console.log('Manifest projects count:', manifest.length);

for (const p of manifest) {
  console.log(`- ${p.title} (${p.category}): ${p.galleryLocal ? p.galleryLocal.length : 0} photos`);
}
