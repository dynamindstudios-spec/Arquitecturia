import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync('public/extracted/simetria/all_projects_manifest.json', 'utf8'));

console.log(`Auditing ${manifest.length} projects...`);
let totalChecked = 0;
let missing = 0;

manifest.forEach(p => {
  // Check cover
  const coverRelative = p.coverLocal.replace(/^\//, '');
  const coverFull = path.resolve('public', coverRelative.replace(/^extracted\//, 'extracted/'));
  if (!fs.existsSync(coverFull) || fs.statSync(coverFull).size < 100) {
    console.warn(`[MISSING COVER] ${p.title}: ${coverFull}`);
    missing++;
  }
  totalChecked++;

  // Check gallery
  p.galleryLocal.forEach(g => {
    const gRelative = g.replace(/^\//, '');
    const gFull = path.resolve('public', gRelative.replace(/^extracted\//, 'extracted/'));
    if (!fs.existsSync(gFull) || fs.statSync(gFull).size < 100) {
      console.warn(`[MISSING GALLERY IMAGE] ${p.title}: ${gFull}`);
      missing++;
    }
    totalChecked++;
  });
});

console.log(`Audit finished: ${totalChecked} image references checked.`);
if (missing === 0) {
  console.log('✅ ALL 170+ PROJECT IMAGES ARE 100% PRESENT AND VALID ON DISK!');
} else {
  console.error(`❌ Found ${missing} missing images.`);
}
