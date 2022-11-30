const fs = require("fs");
const path = require("path");
const hljs = require("highlight.js");
const marked = require("marked");
const { exec } = require("child_process");
// Override function
// const renderer = {
//   code(text) {
//     console.log("text: ", text);
//     return `
//             <template>
//               ${text}
//             <template>`;
//   },
// };
// marked.use({ renderer });
marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "html";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  headerIds: false,
  xhtml: false,
});

const packagesDir = path.resolve(__dirname, "../packages");

const genDemoSvelte = (content, dirPath) => {
  // 获取文件中 ```demo  ``` 之间的内容并去除```demo  ```
  const demoContent = content.match(/```demo(.|\n)*?```/g);
  if (demoContent) {
    targetFiles = demoContent[0]
      .replace(/```demo/g, "")
      .replace(/```/g, "")
      .split(/\n/)
      .filter((item) => item !== "");
  }
  return targetFiles.map((file) => {
    const list = file.split(".");
    list.splice(1, 0, "demo");
    const fileName = list.join(".");
    // 读取demo文件内容
    const demoPath = path.resolve(dirPath, fileName);
    const demoContent = fs.readFileSync(demoPath, "utf-8");
    const highCode = `\`\`\`html \n${demoContent}\`\`\``;
    return highCode;
  });
};

const genComponent = (dirName = "components") => {
  // 遍历packages目录下的所有组件
  const packages = fs.readdirSync(packagesDir).filter((file) => {
    return (
      fs.statSync(path.resolve(packagesDir, file)).isDirectory() &&
      !file.includes(".")
    );
  });

  // 将packages目录下的demos目录中的 index-entry.md 编译成svelte文件  放到examples/menus目录下
  packages.forEach((packageName) => {
    const demoDir = path.resolve(packagesDir, packageName, "demos");
    const demoFiles = fs.readdirSync(demoDir);
    demoFiles.forEach((file) => {
      if (file === "index-entry.md") {
        const demoPath = path.resolve(demoDir, file);
        const demoContent = fs.readFileSync(demoPath, "utf-8");
        const demo = genDemoSvelte(demoContent, demoDir);
        const htmlContent = marked.parse(
          demoContent.replace(/```demo(.|\n)*?```/g, demo.join(""))
        );
        const targetDir = path.resolve(
          __dirname,
          "../examples/src/",
          dirName,
          packageName
        );
        const targetFile = path.resolve(
          __dirname,
          "../examples/src/",
          dirName,
          packageName,
          `index.svelte`
        );
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        fs.writeFileSync(targetFile, `<template>${htmlContent}</template>`, {
          encoding: "utf-8",
          flag: "w",
        });
      }
    });
  });
  exec("pnpm lint:fix");
};

genComponent();
