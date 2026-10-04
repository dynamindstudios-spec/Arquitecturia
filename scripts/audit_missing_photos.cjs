const fs = require('fs');
const path = require('path');

const manifestPath = path.resolve('public/extracted/simetria/all_projects_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const assetsDir = path.resolve('public/extracted/simetria/assets');
const localAssets = new Set(fs.readdirSync(assetsDir));

console.log(`Total projects in manifest: ${manifest.length}`);
console.log(`Total local assets in public/extracted/simetria/assets: ${localAssets.size}`);

let totalReferenced = 0;
let missing = [];

for (const proj of manifest) {
  const coverFile = path.basename(proj.coverLocal || proj.coverAsset);
  totalReferenced++;
  if (!localAssets.has(coverFile)) {
    missing.push({ project: proj.title, type: 'cover', file: coverFile, url: proj.coverAsset });
  }

  const gallery = proj.galleryLocal || proj.galleryAssets || [];
  for (const img of gallery) {
    const gFile = path.basename(img);
    totalReferenced++;
    if (!localAssets.has(gFile)) {
      missing.push({ project: proj.title, type: 'gallery', file: gFile, url: img });
    }
  }
}

console.log(`Total referenced images in manifest: ${totalReferenced}`);
console.log(`Missing referenced images: ${missing.length}`);
if (missing.length > 0) {
  console.log('Missing images:', missing);
}

// Now let's check projectsData.js in src/data/
const projectsDataPath = path.resolve('src/data/projectsData.js');
const projectsDataContent = fs.readFileSync(projectsDataPath, 'utf8');

// Also check what other assets were in bundle.js
if (fs.existsSync('temp_extracted/bundle.js')) {
  const bundle = fs.readFileSync('temp_extracted/bundle.js', 'utf8');
  const allAssetsInBundle = new Set();
  const assetRegex = /["'](\/assets\/[^"']+\.(?:jpg|jpeg|png|webp|svg))["']/g;
  let m;
  while ((m = assetRegex.exec(bundle)) !== null) {
    allAssetsInBundle.add(m[1]);
  }
  console.log(`\nTotal assets found in original bundle.js: ${allAssetsInBundle.size}`);
  const missingFromBundle = [];
  for (const asset of allAssetsInBundle) {
    const f = path.basename(asset);
    if (!localAssets.has(f)) {
      missingFromBundle.push(asset);
    }
  }
  console.log(`Assets in bundle.js missing locally: ${missingFromBundle.length}`);
  if (missingFromBundle.length > 0) {
    console.log('Missing from bundle:', missingFromBundle);
  }
}
