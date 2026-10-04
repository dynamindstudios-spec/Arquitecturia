async function checkCss() {
  const res = await fetch('https://simetriagrupoconstructor.com/assets/index-S8kxmmNV.css');
  const css = await res.text();
  console.log('CSS length:', css.length);
  const urlRegex = /url\(["']?([^"')]+)["']?\)/g;
  const urls = new Set();
  let m;
  while ((m = urlRegex.exec(css)) !== null) {
    urls.add(m[1]);
  }
  console.log('URLs in CSS:', Array.from(urls));
}

checkCss().catch(console.error);
