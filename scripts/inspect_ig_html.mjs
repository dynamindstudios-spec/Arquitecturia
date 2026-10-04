import fs from 'fs';

const html = fs.readFileSync('temp_extracted/instagram.html', 'utf8');

// Search for bio or profile data in script tags
const scriptMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
if (scriptMatches) {
  console.log('Found LD+JSON:');
  scriptMatches.forEach(s => console.log(s));
}

// search for "simetria" in html
const idx = html.indexOf('simetria_gc');
console.log('simetria_gc index:', idx);
if (idx !== -1) {
  console.log(html.substring(Math.max(0, idx - 100), Math.min(html.length, idx + 300)));
}
