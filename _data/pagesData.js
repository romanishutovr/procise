const fs = require("fs");
const matter = require("gray-matter");

const langs = fs.readdirSync("./content").filter((filename) => {
  // Filter out files
  if (filename.indexOf(".") !== -1) return false;

  // Filter out non-ISO 639-1 codes
  if (filename.length !== 2) return false;

  return true;
});

const res = langs.reduce((acc, lang) => {
  const langCustomPagesNames = fs
    .readdirSync(`./content/${lang}`)
    .filter((filename) => {
      return filename.indexOf(".md") !== -1;
    })
    .map((filename) => {
      const content = fs.readFileSync(`./content/${lang}/${filename}`, "utf8");
      const parsed = matter(content);
      return { ...parsed, page: filename };
    });

  return { ...acc, [lang]: langCustomPagesNames };
}, {});

module.exports = res;
