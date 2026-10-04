import fs from 'fs';
import path from 'path';

const bundleJs = fs.readFileSync('temp_extracted/bundle.js', 'utf8');

// Build complete variable map
const assetMap = {};
// regex to find: identifier = "/assets/filename.ext"
const regex = /\b([a-zA-Z0-9_$]+)\s*=\s*["'](\/assets\/[^"']+)["']/g;
let match;
while ((match = regex.exec(bundleJs)) !== null) {
  assetMap[match[1]] = match[2];
}

console.log(`Total asset variables matched: ${Object.keys(assetMap).length}`);

// Let's parse the projects array Uc = [{...}]
const ucMatch = bundleJs.match(/Uc\s*=\s*(\[\s*\{title:[\s\S]*?\}\s*\])/);
if (!ucMatch) {
  console.error('Could not match Uc array!');
} else {
  const rawArrayStr = ucMatch[1];
  console.log('Found Uc raw string length:', rawArrayStr.length);

  // Parse each project object: {title:"...",category:"...",image:Var,gallery:[Var,Var,...]}
  const projectRegex = /\{title:\s*["']([^"']+)["'],\s*category:\s*["']([^"']+)["'],\s*image:\s*([a-zA-Z0-9_$]+),\s*gallery:\s*\[([^\]]+)\]\}/g;
  const projects = [];
  let pMatch;
  while ((pMatch = projectRegex.exec(rawArrayStr)) !== null) {
    const title = pMatch[1];
    const category = pMatch[2];
    const imageVar = pMatch[3];
    const galleryVars = pMatch[4].split(',').map(s => s.trim());

    const coverAsset = assetMap[imageVar] || imageVar;
    const galleryAssets = galleryVars.map(v => assetMap[v] || v);

    projects.push({
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      category,
      coverVariable: imageVar,
      coverAsset,
      galleryVariables: galleryVars,
      galleryAssets
    });
  }

  console.log(`Successfully parsed ${projects.length} projects!`);
  fs.writeFileSync('temp_extracted/projects_resolved.json', JSON.stringify(projects, null, 2), 'utf8');
}

// Let's extract splash screen (hL)
const splashMatch = bundleJs.match(/hL\s*=\s*(\([^\)]*\)\s*=>[\s\S]*?)(?:,\s*[a-zA-Z0-9_$]+\s*=\s*|\}\s*;\s*const)/);
if (splashMatch) {
  fs.writeFileSync('temp_extracted/splash_component.js', splashMatch[0], 'utf8');
}

// Let's extract nosotros (q2)
const nosotrosMatch = bundleJs.match(/q2\s*=\s*(\([^\)]*\)\s*=>[\s\S]*?)(?:,\s*[a-zA-Z0-9_$]+\s*=\s*|\}\s*;\s*const)/);
if (nosotrosMatch) {
  fs.writeFileSync('temp_extracted/nosotros_component.js', nosotrosMatch[0], 'utf8');
}
