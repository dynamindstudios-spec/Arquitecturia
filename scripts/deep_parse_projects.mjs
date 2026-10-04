import fs from 'fs';

const bundleJs = fs.readFileSync('temp_extracted/bundle.js', 'utf8');

// Let's search for keywords in bundleJs: projects, categories, descriptions
console.log('Bundle length:', bundleJs.length);

// Let's find project structures or arrays
// Search for text snippets
const projectTerms = ['Altea', 'Kallpa', 'Altos', 'Residencial', 'Comercial', 'Saman', 'Lote', 'Casa', 'Torre', 'Edificio', 'Guayacan', 'Ceiba', 'Nogal'];

for (const term of projectTerms) {
  const idx = bundleJs.indexOf(term);
  if (idx !== -1) {
    console.log(`Found term "${term}" at index ${idx}:`);
    console.log(bundleJs.substring(Math.max(0, idx - 100), Math.min(bundleJs.length, idx + 200)));
    console.log('----------------------------------------------------');
  }
}

// Let's inspect extracted image urls
const imageUrls = JSON.parse(fs.readFileSync('temp_extracted/extracted_image_urls.json', 'utf8'));
console.log('Sample image URLs:');
console.log(imageUrls.slice(0, 20));
