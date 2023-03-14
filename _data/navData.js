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
const groupProducts = [];
function dataSorter(group, filename, parsed) {
  const pageLink = filename.slice(0, -3);

  const secondDrop = parsed.data.contentSections.map((item) => ({
    secondDropTitle: item.title,
    lastDropTitle: item.title,
    lastDropDescription: item.subtitle,
  }));

  group.push({
    pageLink,
    firstDropTitle: parsed.data.pageName,
    secondDrop,
  });
}

langs.reduce((acc, lang) => {
  const langCustomPagesNames = fs
    .readdirSync(`./content/${lang}`)
    .filter((filename) => {
      return filename.indexOf(".md") !== -1;
    })
    .forEach((filename, idx) => {
      const content = fs.readFileSync(`./content/${lang}/${filename}`, "utf8");
      const parsed = matter(content);
      if (parsed.data.group === "solution") {
        dataSorter(groupSolutions, filename, parsed);
      }
      if (parsed.data.group === "product") {
        dataSorter(groupProducts, filename, parsed);
      }
    });
});

module.exports = { groupSolutions, groupProducts };
