const path = require('path')

module.exports = {
  publicPath: '/', // 和 webpack 本身的 output.publicPath 一致
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  assetsDir: 'assets', // 相对于 outputDir，放置生成的静态资源（js、css、img、fonts）
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径（相对于 outputDir）。也可以是一个绝对路径
  filenameHashing: true, // 文件名中包含 hash，以便更好的控制缓存
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false, // 不需要生产环境 sourcemap
  css: {
    extract: process.env.NODE_ENV !== 'production' ? false : true,
    sourceMap: process.env.NODE_ENV !== 'production' ? false : true,
    loaderOptions: {
      less: {
        // 安装 babel-plugin-import 按需加载插件后报错
        // 解决报错问题：.bezierEasingMixin() ^Inline JavaScript is not enabled. Is it set in your options?
        javascriptEnabled: true
      },
    }
  },
  configureWebpack: config => {
    // 该函数会在环境变量被设置之后执行
    // 第一个参数是已经解析好的配置
    // 在函数体内，可以直接修改配置，也可以返回一个将会被合并的对象
    console.log('configure ', config)
  }
}
