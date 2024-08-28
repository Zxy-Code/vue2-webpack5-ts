/**
 * @file 项目编译产出配置
 * @author zxy
 */
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

// 3-1 目前支持的模块名数组，主要是根据projects目录下的文件夹的名字来确定，common是基础库，不作为项目产出
let files = fs.readdirSync('./projects');
const shell = require('shelljs');
let modules = [];
files.forEach(filename => {
    // 过滤掉common项目和非项目文件
    if (filename !== 'common' && (!/^\./.test(filename))) {
        modules.push(filename);
    }
});

// 3-2 获取产出模块 取出npm命令中的模块参数 npm run serve demos2
const npmArgs = process.argv.splice(2);
let moduleName = npmArgs[0];
// 3-2-1 remote模式下，需要取出remote对应的地址 npm run serve-remote demos2 RD_NAME
if (npmArgs.length > 1) {
    process.env.SUPPORT_REMOTE_ADDRESS = npmArgs[1];
}

// 3-3 处理指定模块, 默认处理所有模块
modules = (moduleName && moduleName !== 'all') ? [moduleName] : modules;
console.log('支持产出的模块名：' + modules);
// eslint-disable-next-line
for (let module of modules) {
    // console.log(module);
    // 根据产出模块，设置vue.conf.js的路径
    process.env.VUE_CLI_SERVICE_CONFIG_PATH = path.resolve(__dirname, '../projects/' + module + '/vue.config.js');
    // 获取产出环境 && 执行相应的shell命令
    let cmdStr = process.env.NODE_ENV === 'production' ? 'build-real'
        : process.env.NODE_ENV === 'test' ? 'test-real' : 'serve-real';
    // 对构建目标是lib的模块进行特殊处理
    if (process.env.npm_package_libconfig_module === module && process.env.NODE_ENV !== 'test') {
        // cmdStr = 'build-ui';
    }
    process.env.MODULE_NAME = module;
    let commandStr;
    if (process.env.NODE_ENV === 'development') {
        // let configPath = `../projects/${module}/vue.config.js`;
        commandStr = 'vue-cli-service serve';
    }
    else if (process.env.NODE_ENV === 'production') {
        // let configPath = `../projects/${module}/vue.config.js`;
        commandStr = 'vue-cli-service build';
    }
    console.log(commandStr);
    console.log(process.env.NODE_ENV);
    shell.exec(commandStr);

}


