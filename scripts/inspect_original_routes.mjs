import fs from 'fs';

const bundle = fs.readFileSync('temp_extracted/_assets_index-ByDyvFzI.js', 'utf8');

// Find react-router routes or path definitions: path:"/..."
const routeRegex = /path:\s*["']([^"']+)["']/g;
const routes = new Set();
let m;
while ((m = routeRegex.exec(bundle)) !== null) {
  routes.add(m[1]);
}
console.log('Routes in bundle:', Array.from(routes));

// Check how projects are displayed in the original site
// Look for how Uc (the projects array) is used!
const ucUsageRegex = /\bUc\b/g;
let count = 0;
while ((m = ucUsageRegex.exec(bundle)) !== null) {
  count++;
  const start = Math.max(0, m.index - 50);
  const end = Math.min(bundle.length, m.index + 100);
  console.log(`Uc match ${count}:`, bundle.substring(start, end));
}
