import fs from 'fs';

const css = fs.readFileSync('temp_extracted/bundle.css', 'utf8');

const fontMatches = css.match(/font-family:[^;]+/g);
console.log('Font families:', [...new Set(fontMatches)]);

const serifMatches = css.match(/\.(?:font-serif-display|font-sans-body)\{[^\}]+\}/g);
console.log('Serif / Sans classes:', serifMatches);
