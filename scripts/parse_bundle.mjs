import fs from 'fs';
import path from 'path';

async function fetchBundle() {
  const jsUrl = 'https://simetriagrupoconstructor.com/assets/index-ByDyvFzI.js';
  const cssUrl = 'https://simetriagrupoconstructor.com/assets/index-S8kxmmNV.css';

  console.log('Downloading JS bundle...');
  const jsRes = await fetch(jsUrl);
  const jsCode = await jsRes.text();
  fs.writeFileSync('temp_extracted/bundle.js', jsCode, 'utf8');
  console.log('Saved bundle.js, length:', jsCode.length);

  console.log('Downloading CSS bundle...');
  const cssRes = await fetch(cssUrl);
  const cssCode = await cssRes.text();
  fs.writeFileSync('temp_extracted/bundle.css', cssCode, 'utf8');
  console.log('Saved bundle.css, length:', cssCode.length);

  // Extract all URLs (https://... or /assets/...)
  const urlRegex = /(https?:\/\/[^\s"'\`\\]+|(?:\/assets\/[^\s"'\`\\]+))/gi;
  const allUrls = new Set();
  let match;
  while ((match = urlRegex.exec(jsCode)) !== null) {
    let cleanUrl = match[1].replace(/[,\);]+$/, '');
    allUrls.add(cleanUrl);
  }

  // Filter image URLs
  const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif'];
  const imageUrls = Array.from(allUrls).filter(u => {
    const lower = u.toLowerCase();
    return imageExtensions.some(ext => lower.includes(ext)) || lower.includes('file-uploads') || lower.includes('unsplash');
  });

  console.log(`Found ${allUrls.size} total URLs, ${imageUrls.length} image URLs in JS bundle.`);

  fs.writeFileSync('temp_extracted/extracted_image_urls.json', JSON.stringify(imageUrls, null, 2));

  // Let's also search for project data / structures in the JS
  // Look for project definitions
  const projectsMatches = [];
  // search for strings like "title:", "name:", "slug:", "categoria:", "ubicacion:", etc.
  fs.writeFileSync('temp_extracted/all_urls.json', JSON.stringify(Array.from(allUrls), null, 2));
}

fetchBundle().catch(console.error);
