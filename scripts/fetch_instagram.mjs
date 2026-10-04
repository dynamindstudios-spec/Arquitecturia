import fs from 'fs';

async function fetchInstagram() {
  try {
    const res = await fetch('https://www.instagram.com/simetria_gc/?hl=es', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8'
      }
    });
    const html = await res.text();
    console.log('Instagram fetch status:', res.status, 'length:', html.length);
    fs.mkdirSync('temp_extracted', { recursive: true });
    fs.writeFileSync('temp_extracted/instagram.html', html, 'utf8');

    // Extract meta tags
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/i) || html.match(/<meta name="description" content="([^"]+)"/i);
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/i);
    const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);

    console.log('Title:', titleMatch?.[1]);
    console.log('Description:', descMatch?.[1]);
    console.log('Avatar/Image:', imageMatch?.[1]);

    if (imageMatch?.[1]) {
      const imgRes = await fetch(imageMatch[1]);
      if (imgRes.ok) {
        const buf = await imgRes.arrayBuffer();
        fs.writeFileSync('public/extracted/simetria/instagram_avatar.jpg', Buffer.from(buf));
        console.log('Saved instagram_avatar.jpg');
      }
    }
  } catch (err) {
    console.error('Error fetching instagram:', err.message);
  }
}

fetchInstagram().catch(console.error);
