import fs from 'fs';
import path from 'path';

const assetsDir = 'public/extracted/simetria/assets';
const simetriaDir = 'public/extracted/simetria';

fs.copyFileSync(path.join(assetsDir, 'logo-simetria-mint-BgwhjpzY.png'), path.join(simetriaDir, 'logo.png'));
fs.copyFileSync(path.join(assetsDir, 'logo-simetria-mint-BgwhjpzY.png'), path.join(simetriaDir, 'logo-mint.png'));
fs.copyFileSync(path.join(assetsDir, 'logo-simetria-gray-C2B8jjfy.png'), path.join(simetriaDir, 'logo-gray.png'));
fs.copyFileSync(path.join(assetsDir, 'logo-simetria-horizontal-mint-5JTXurE1.png'), path.join(simetriaDir, 'logo-horizontal.png'));

// Also save hero slideshow images
const heroSlides = [
  '/extracted/simetria/assets/foto-6-B0xNpQ8j.jpg',
  '/extracted/simetria/assets/foto-7-Babynr_D.jpg',
  '/extracted/simetria/assets/foto-11-WLO3ngWX.jpg',
  '/extracted/simetria/assets/foto-15-DHw98ztK.jpg',
  '/extracted/simetria/assets/foto-7-BUhdoSwb.jpg'
];

fs.writeFileSync(path.join(simetriaDir, 'hero_slides.json'), JSON.stringify(heroSlides, null, 2), 'utf8');
console.log('Logos and hero slides properly established!');
