import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('public/extracted/simetria/all_projects_manifest.json', 'utf8'));

// Dollar variable mapping
const dollarMap = {
  '$D': '/extracted/simetria/assets/sala-plantas-D9Gi_fJP.jpg',
  '$L': '/extracted/simetria/assets/fachada-Bf5xCviI.jpg',
  '$2': '/extracted/simetria/assets/pasillo-bp1Gugcl.jpg'
};

manifest.forEach(p => {
  p.galleryLocal = p.galleryLocal.map(g => {
    if (g.endsWith('/$D')) return dollarMap['$D'];
    if (g.endsWith('/$L')) return dollarMap['$L'];
    if (g.endsWith('/$2')) return dollarMap['$2'];
    return g;
  });
});

fs.writeFileSync('public/extracted/simetria/all_projects_manifest.json', JSON.stringify(manifest, null, 2), 'utf8');

// Now re-run generate_projects_data.mjs
console.log('Fixed dollar mappings in manifest!');
