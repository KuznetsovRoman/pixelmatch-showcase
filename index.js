const fs = require('node:fs');
const pixelmatch = require('pixelmatch');
const PNG = require('pngjs').PNG;

const compare = (imageA, imageB, opts) => {
    const img1 = PNG.sync.read(imageA);
    const img2 = PNG.sync.read(imageB);

    const {width, height} = img1;
    const diff = new PNG({width, height});

    return pixelmatch(img1.data, img2.data, diff.data, width, height, opts);
}

const image1 = fs.readFileSync('images/image1.png');
const image2 = fs.readFileSync('images/image2.png');
const image3 = fs.readFileSync('images/image3.png');
const image4 = fs.readFileSync('images/image4.png');

// Pixelmatch can't see the difference between green and blue
const result1 = compare(image1, image2, {threshold: 0.15});
console.log(`${result1} different pixels`); // 0 different pixels

// But sees the diffrence between cyan and cyan
const result2 = compare(image3, image4, {threshold: 0.15});
console.log(`${result2} different pixels`); // 25220 different pixels
