const path = require("path");

// 获取命令行参数 -d 执行某个子模块的文件夹 -s 启动的脚本命令
const { d: dir, s: script } = require("minimist")(process.argv.slice(2));

// 执行examples下的package.json的命令
const exec = require("child_process").execSync;

// 获取当前目录
const cwd = process.cwd();

// 进入 dir 目录
process.chdir(path.resolve(cwd, dir));
// 获取package.json中的 scripts
const { scripts } = require(path.resolve(cwd, dir, "package.json"));

// 如果有script参数，执行对应的命令
if (script) {
  exec(scripts[script], { stdio: "inherit" });
}
