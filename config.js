// 读取配置文件
const fs = require("fs");

let globalConfig = {};

let conf = fs.readFileSync("./server.conf");

let configArr = conf.toString().split("\n");

for(let i = 0;i<configArr.length;i++){
    globalConfig[configArr[i].split("=")[0].trim()]=configArr[i].split("=")[1].trim();
}

console.log(globalConfig);

// 导出服务器配置
module.exports = globalConfig;