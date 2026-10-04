import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Fetching https://simetriagrupoconstructor.com ...');
  try {
    const res = await fetch('https://simetriagrupoconstructor.com', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    console.log('Status:', res.status, 'HTML length:', html.length);
    fs.mkdirSync('temp_extracted', { recursive: true });
    fs.writeFileSync('temp_extracted/home.html', html, 'utf8');

    const title = html.match(/<title>(.*?)<\/title>/i)?.[1] || '';
    console.log('Page Title:', title);

    const hrefRegex = /href=["']([^"']+)["']/gi;
    const links = new Set();
    let m;
    while ((m = hrefRegex.exec(html)) !== null) {
      links.add(m[1]);
    }

    const imgRegex = /(?:src|srcset|data-src|data-lazy-src)=["']([^"']+)["']/gi;
    const images = new Set();
    while ((m = imgRegex.exec(html)) !== null) {
      images.add(m[1]);
    }

    console.log('Total Links found:', links.size);
    console.log('Total Images found on home:', images.size);

    const internalLinks = Array.from(links).filter(l => 
      l.startsWith('https://simetriagrupoconstructor.com') || 
      l.startsWith('/')
    );
    console.log('\nInternal Links:', internalLinks);

    fs.writeFileSync('temp_extracted/initial_links.json', JSON.stringify({
      title,
      internalLinks,
      allLinks: Array.from(links),
      images: Array.from(images)
    }, null, 2));

  } catch (err) {
    console.error('Error in main fetch:', err);
  }
}

main();
