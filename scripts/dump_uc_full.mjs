import fs from 'fs';

const bundle = fs.readFileSync('temp_extracted/_assets_index-ByDyvFzI.js', 'utf8');

// Match: Uc = [...]
const ucMatch = bundle.match(/Uc\s*=\s*(\[\s*\{title:[\s\S]*?\}\s*\])/);
if (!ucMatch) {
  console.error('Could not find Uc!');
  process.exit(1);
}

const rawUc = ucMatch[1];
console.log('Raw Uc length:', rawUc.length);

// Also build variable map: e.g. Yy = "/assets/..."
const varMap = {};
const varRegex = /\b([a-zA-Z0-9_$]+)\s*=\s*["'](\/assets\/[^"']+)["']/g;
let m;
while ((m = varRegex.exec(bundle)) !== null) {
  varMap[m[1]] = m[2];
}

console.log('Total variable mappings found:', Object.keys(varMap).length);

// Extract each project: {title:"...",category:"...",image:Var,gallery:[Var,Var,...]}
const projRegex = /\{title:\s*["']([^"']+)["'],\s*category:\s*["']([^"']+)["'],\s*image:\s*([a-zA-Z0-9_$]+),\s*gallery:\s*\[([^\]]+)\]\}/g;

const parsedProjects = [];
let pm;
while ((pm = projRegex.exec(rawUc)) !== null) {
  const title = pm[1];
  const category = pm[2];
  const imageVar = pm[3];
  const galleryVars = pm[4].split(',').map(s => s.trim());

  const coverAsset = varMap[imageVar] || imageVar;
  const galleryAssets = galleryVars.map(v => varMap[v] || v);

  parsedProjects.push({
    title,
    category,
    coverVar: imageVar,
    coverAsset,
    galleryVars,
    galleryAssets
  });
}

console.log(`Parsed ${parsedProjects.length} projects from Uc:`);
parsedProjects.forEach((p, idx) => {
  console.log(`${idx + 1}. ${p.title} (${p.category}): cover=${p.coverAsset}, galleryCount=${p.galleryAssets.length}`);
  const unmapped = p.galleryAssets.filter(a => !a.startsWith('/assets/'));
  if (unmapped.length > 0) {
    console.warn(`  ⚠️ UNMAPPED VARIABLES in ${p.title}:`, unmapped);
  }
});

fs.writeFileSync('temp_extracted/uc_parsed_full.json', JSON.stringify(parsedProjects, null, 2), 'utf8');
