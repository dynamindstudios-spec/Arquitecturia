import fs from 'fs';

const bundle = fs.readFileSync('temp_extracted/_assets_index-ByDyvFzI.js', 'utf8');

// Match any variable assignment: identifier = "/assets/..."
// Identifier can be any valid JS identifier: [$a-zA-Z_][$a-zA-Z0-9_]*
const regex = /(?:^|[;,{}\s])([$a-zA-Z_][$a-zA-Z0-9_]*)\s*=\s*["'](\/assets\/[^"']+)["']/g;
const varMap = {};
let m;
while ((m = regex.exec(bundle)) !== null) {
  varMap[m[1]] = m[2];
}

console.log('Total variable mappings found with robust regex:', Object.keys(varMap).length);

// Check dollar variables specifically
const dollarVars = Object.keys(varMap).filter(k => k.startsWith('$'));
console.log('Variables starting with $:', dollarVars.length, dollarVars);
dollarVars.forEach(v => {
  console.log(`  ${v} = ${varMap[v]}`);
});
