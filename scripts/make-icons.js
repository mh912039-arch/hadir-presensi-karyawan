const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const svg512 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="115" fill="#0C2B22"/>
  <rect x="24" y="24" width="464" height="464" rx="95" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="4"/>
  <text x="145" y="375" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="340" font-weight="900" fill="#FFFFFF" letter-spacing="-10">h</text>
  <circle cx="370" cy="355" r="32" fill="#10B981"/>
</svg>`;

fs.writeFileSync(path.join(iconsDir, 'icon.svg'), svg512);

async function generate() {
  const svgBuffer = Buffer.from(svg512);

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-512.png'));

  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, 'icon-192.png'));

  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(iconsDir, 'apple-touch-icon.png'));

  // Also write favicon
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'favicon.png'));

  console.log('All PWA icons generated successfully!');
}

generate().catch(console.error);
