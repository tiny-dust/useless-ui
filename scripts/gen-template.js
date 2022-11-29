// 自动在packages目录下创建格式化的组件文件夹 
const fs = require("fs");
const path = require("path");
const packagesDir = path.resolve(__dirname, "../packages");
const dirs = ["src", "demos", "style", "test"];
// 获取命令行参数 -n
const argv = process.argv.slice(2);
const componentName = argv[1];

// 创建目录文件夹 例如packages/button/src packages/button/demos  packages/button/style packages/button/test
const createDir = (dirName) => {
  const dirPath = path.resolve(packagesDir, componentName,dirName);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

dirs.forEach((dir) => {
  createDir(dir);
})

// demos文件夹下创建index-entry.md basic.demo.svelte
const demosDir = path.resolve(packagesDir, "demos");
const demosFiles = ["index-entry.md", "basic.demo.svelte"];
const createDemosFile = (fileName,content) => {
  const filePath = path.resolve(demosDir, fileName);
  if(!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, { encoding: "utf-8", flag: "w" });
  }
};
demosFiles.forEach((file, index) => {
  // 读取.template文件内容 写入demos目录下
  const content = path.resolve(packagesDir, `.template`, index === 0 ? "index-entry.md" : "basic.demo.svelte");
  console.log('content: ', content);
  const targetFile = path.resolve(packagesDir, componentName, "demos", file);
  const templateContent = fs.readFileSync(content, "utf-8");
  createDemosFile(targetFile, templateContent);
});
