const fs = require("fs");
const path = require("path");
const hljs = require("highlight.js");
const marked = require("marked");
const { exec } = require("child_process");

marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "html";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: true,
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
  // 获取demos下的目标演示文件
  return targetFiles.map((file) => {
    const list = file.split(".");
    list.splice(1, 0, "demo");
    const fileName = list.join(".");
    // 读取demo文件内容
    const demoPath = path.resolve(dirPath, fileName);
    const demoContent = fs.readFileSync(demoPath, "utf-8");
    const highCode = `\`\`\`html\n${demoContent}\n\`\`\``;
    return highCode;
  });
};

const genComponent = (dirName = "pages") => {
  // 遍历packages目录下的所有组件
  const packages = fs.readdirSync(packagesDir).filter((file) => {
    // 排除不需要编译的文件和文件夹
    return (
      fs.statSync(path.resolve(packagesDir, file)).isDirectory() &&
      !file.includes(".") && file !== 'styles'
    );
  });

  // 将packages目录下的demos目录中的 index-entry.md 编译成svelte文件  放到examples/pages目录下
  packages.forEach((packageName) => {
    const demoDir = path.resolve(packagesDir, packageName, "demos");
    const demoFiles = fs.readdirSync(demoDir);
    demoFiles.forEach((file) => {
      if (file === "index-entry.md") {
        const demoPath = path.resolve(demoDir, file);
        const demoContent = fs.readFileSync(demoPath, "utf-8");
        // 获取md入口文件中加入的demo组件
        const demoFile = genDemoSvelte(demoContent, demoDir);
        const showComponent = demoFile.map(demo => {
          // 获取每个入口文件中<template></template>之间的内容
          const templateContent = demo.match(/<template>(.|\n)*?<\/template>/g);
          if (templateContent) {
            return templateContent[0]
              .replace(/<template>/g, `<div class="component-list">`)
              .replace(/<\/template>/g, `</div>`);
          }
          return '';
        })

        const htmlContent = marked.parse(
          demoContent.replace(/```demo(.|\n)*?```/g, demoFile.join('\n'))
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
        // 生成svelte文件
        const wrapper = `<template>\n<div class="enter-x">\n${htmlContent}\n</div>\n</template>`
        const importStr = genImport(packageName);
        // 在wrapper中分析  在每个<pre>之前插入showComponent
        const wrapperArr = wrapper.split('</pre>');
        wrapperArr.forEach((item, index) => {
          if (item.includes('<pre')) {
            wrapperArr[index] = item + showComponent[index];
          }
        })

        fs.writeFileSync(targetFile, importStr + wrapperArr, {
          encoding: "utf-8",
          flag: "w",
        });
      }
    });
  });
  exec("pnpm lint:fix");
};

// 将组件引入到examples/src/ 下各自的组件中并引入
const genImport = (componentName) => {
  // 首字母大写
  const ComponentName = componentName.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  const componentPath = `import ${ComponentName} from "../../../../packages/${componentName}/src/index.svelte";`;
  return `<script>${componentPath}</script>`;
}

genComponent();
