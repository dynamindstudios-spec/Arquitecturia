import fs from 'fs';

async function crawl() {
  console.log('Fetching live https://simetriagrupoconstructor.com...');
  const res = await fetch('https://simetriagrupoconstructor.com/', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  console.log('Live HTML received, length:', html.length);
  fs.writeFileSync('temp_extracted/live_index.html', html, 'utf-8');

  // Find all script tags
  const scripts = [];
  const scriptRegex = /<script[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = scriptRegex.exec(html)) !== null) {
    scripts.push(m[1]);
  }
  console.log('Scripts in index.html:', scripts);

  // Fetch each script
  for (const s of scripts) {
    const fullUrl = s.startsWith('http') ? s : `https://simetriagrupoconstructor.com${s.startsWith('/') ? '' : '/'}${s}`;
    console.log('Fetching script:', fullUrl);
    const sRes = await fetch(fullUrl);
    const sCode = await sRes.text();
    console.log(`Script ${s} size: ${sCode.length} chars`);
    fs.writeFileSync(`temp_extracted/${s.replace(/[^a-zA-Z0-9_.-]/g, '_')}`, sCode, 'utf-8');
  }
}

crawl().catch(console.error);
