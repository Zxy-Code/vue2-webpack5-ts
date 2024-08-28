/**
 * @file postcss插件配置文件
 * @type {{plugins: {autoprefixer: {remove: boolean}, "postcss-px2rem": {remUnit: number}}}}
 */
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 75, // 设计稿宽度/10，假设设计稿宽度为 375px
            propList: ['*'], // 需要转换的属性，'*' 表示全部
            selectorBlackList: [], // 忽略转换的选择器
            replace: true, // 是否直接替换掉原来的px单位
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            minPixelValue: 2 // 设置一个最小值，小于这个值的 px 单位不会被转换
        }
    }
};