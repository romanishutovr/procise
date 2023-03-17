const fs = require("fs").promises;
const sharp = require("sharp");

module.exports = async function main() {
  console.log("start");
  const outputPath = "_site/assets/images/";
  const widthList = [640, 828, 1200, 2048, 3840];
  const startTs = Date.now();
  const imagesList = await fs.readdir("./public/assets/images/"); // add checks

  for (let index = 0; index < imagesList.length; index++) {
    const imagePath = imagesList[index];
    const extenstion = imagePath.split(".").pop();
    const imageBaseName = imagePath.split(".").slice(0, -1).join(".");
    // const image = await fs.readFile(`./public/assets/images/${imagePath}`);

    for (let j = 0; j < widthList.length; j++) {
      const currentWidth = widthList[j];

      const compressedBuffer = await sharp(
        `./public/assets/images/${imagePath}`
      )
        .webp()
        .resize(currentWidth)
        // .jpeg({ mozjpeg: true }) // what is mozjpeg?
        .toFile(`${outputPath}${imageBaseName}_width-${currentWidth}.webp`);

      // await fs.writeFile(
      //   `${outputPath}${imageBaseName}_width-${currentWidth}.${extenstion}`,
      //   compressedBuffer
      // );
    }
  }

  const endTs = Date.now();
  console.log(`Compressed ${imagesList.length} images in ${endTs - startTs}ms`);
};
