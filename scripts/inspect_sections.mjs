import fs from 'fs';

const bundleJs = fs.readFileSync('temp_extracted/bundle.js', 'utf8');

// Find sections or text in the bundle
const sections = ['nosotros', 'servicios', 'contacto', 'equipo', 'filosofia', 'whatsapp', 'instagram'];
for (const s of sections) {
  let idx = 0;
  while ((idx = bundleJs.toLowerCase().indexOf(`"${s}"`, idx)) !== -1) {
    console.log(`Found "${s}" at ${idx}`);
    console.log(bundleJs.substring(Math.max(0, idx - 50), Math.min(bundleJs.length, idx + 400)));
    console.log('='.repeat(50));
    idx += s.length + 1;
  }
}

// Let's also extract all phone numbers and emails
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
const emails = bundleJs.match(emailRegex);
console.log('Emails found:', [...new Set(emails)]);

const phoneRegex = /(?:\+?57)?\s*3\d{2}[\s.-]?\d{3}[\s.-]?\d{4}/g;
const phones = bundleJs.match(phoneRegex);
console.log('Phones found:', [...new Set(phones)]);
