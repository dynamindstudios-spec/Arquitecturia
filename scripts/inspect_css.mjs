import fs from 'fs';

const css = fs.readFileSync('temp_extracted/bundle.css', 'utf8');

// Find color definitions or font definitions
const colorMatches = css.match(/--brand-[a-zA-Z0-9_-]+:[^;]+/g);
console.log('Brand CSS variables:', colorMatches);

// Find colors with # or hsl
const hexColors = new Set(css.match(/#[0-9a-fA-F]{3,8}/g));
console.log('Hex colors sample:', Array.from(hexColors).slice(0, 30));

// Find classes like bg-brand-dark, text-brand-mint
const brandClasses = css.match(/\.(?:bg|text|border)-brand-[a-zA-Z0-9_-]+\{[^\}]+\}/g);
console.log('Brand classes:', brandClasses);
