import fs from 'fs';

const bundleJs = fs.readFileSync('temp_extracted/bundle.js', 'utf8');

const targets = ['$D', '$L', '$2'];
targets.forEach(t => {
  let idx = 0;
  while ((idx = bundleJs.indexOf(t, idx)) !== -1) {
    const slice = bundleJs.substring(Math.max(0, idx - 40), Math.min(bundleJs.length, idx + 60));
    console.log(`Found ${t} at ${idx}: ${slice}`);
    idx += t.length + 1;
  }
});
