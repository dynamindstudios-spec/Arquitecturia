const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(scanDir(p));
    } else if (item.name.endsWith('.jsx') || item.name.endsWith('.js')) {
      files.push(p);
    }
  }
  return files;
}

const allFiles = scanDir(path.resolve('src'));
console.log(`Scanning ${allFiles.length} files in src/ for undeclared identifiers...`);

const hooksToCheck = ['useTranslation', 'useScroll', 'useTransform', 'useSpring', 'useMotionValueEvent', 'useState', 'useEffect', 'useRef', 'useCallback', 'useMemo'];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  for (const hook of hooksToCheck) {
    // Check if hook is used (e.g. hook(...) or = hook() or hook.)
    const usageRegex = new RegExp(`\\b${hook}\\s*\\(`, 'g');
    if (usageRegex.test(content)) {
      // Check if hook is imported
      const importRegex = new RegExp(`\\b${hook}\\b.*from`, 'g');
      const importRegex2 = new RegExp(`import\\s+.*\\b${hook}\\b`, 'g');
      const defRegex = new RegExp(`(function|const|let|var)\\s+${hook}\\b`, 'g');
      if (!importRegex.test(content) && !importRegex2.test(content) && !defRegex.test(content)) {
        console.error(`🚨 MISSING IMPORT: ${hook} in ${file}`);
      }
    }
  }
}
console.log('Check finished.');
