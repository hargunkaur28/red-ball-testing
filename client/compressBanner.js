const sharp = require('sharp');
const path = require('path');

sharp(path.join(__dirname, 'public/banner.png'))
  .resize(1200, 630)
  .jpeg({ quality: 85 })
  .toFile(path.join(__dirname, 'public/banner.jpg'), (err, info) => {
    if (err) return console.error(err);
    console.log('Done:', info);
    console.log('Size:', (info.size / 1024).toFixed(1), 'KB');
  });
