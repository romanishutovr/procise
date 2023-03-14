const fs = require("fs");
const matter = require("gray-matter");

const langs = fs.readdirSync("./content").filter((filename) => {
  // Filter out files
  if (filename.indexOf(".") !== -1) return false;

  // Filter out non-ISO 639-1 codes
  if (filename.length !== 2) return false;

  return true;
});
const groupSolutions = [];

const res = langs.reduce((acc, lang) => {
  const langCustomPagesNames = fs
    .readdirSync(`./content/${lang}`)
    .filter((filename) => {
      return filename.indexOf(".md") !== -1;
    })
    .forEach((filename, idx) => {
      const content = fs.readFileSync(`./content/${lang}/${filename}`, "utf8");
      const parsed = matter(content);
      if (parsed.data.group === "solution") {
        const pageLink = filename.slice(0, -3);

        const secondDrop = [];
        parsed.data.contentSections.forEach((item) => {
          secondDrop.push({
            secondDropTitle: item.title,
            lastDropTitle: item.title,
            lasDropDescription: item.subtitle,
          });
        });

        groupSolutions.push({
          pageLink, // remove .md from end
          firstDropTitle: parsed.data.pageName,
          secondDrop,
        });
      }
    });
});

console.log(groupSolutions);

module.exports = groupSolutions;
