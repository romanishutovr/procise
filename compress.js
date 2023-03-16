const fs = require("fs").promises;
const sharp = require("sharp");
const outputPath = "_site/assets/images/";

const widthList = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];

async function main() {
  const startTs = Date.now();
  const imagesList = await fs.readdir("./public/assets/images/"); // add checks

  for (let index = 0; index < imagesList.length; index++) {
    const imagePath = imagesList[index];
    const extenstion = imagePath.split(".").pop();
    const imageBaseName = imagePath.split(".").slice(0, -1).join(".");
    // const image = await fs.readFile(`./public/assets/images/${imagePath}`);

    for (let j = 0; j < widthList.length; j++) {
      const currentWidth = widthList[j];

      const compressedBuffer = await sharp(`./public/assets/images/${imagePath}`)
        .rotate()
        .resize(currentWidth)
        .jpeg({ mozjpeg: true }) // what is mozjpeg?
        .toBuffer();

      await fs.writeFile(
        `${outputPath}${imageBaseName}_width-${currentWidth}.${extenstion}`,
        compressedBuffer
      );
    }
  }

  const endTs = Date.now();
  console.log(`Compressed ${imagesList.length} images in ${endTs - startTs}ms`);
}

main();
