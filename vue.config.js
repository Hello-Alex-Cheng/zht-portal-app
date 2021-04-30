const path = require('path')

module.exports = {
  productionSourceMap: false,
  filenameHashing: true,
  css: {
    loaderOptions: {
      less: {
        // 安装 babel-plugin-import 按需加载插件后报错
        // 解决报错问题：.bezierEasingMixin() ^Inline JavaScript is not enabled. Is it set in your options?
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: config => {
    const myConfig = Object.create(null)
    myConfig.resolve = {
      extensions: ['.js', '.ts', '.vue', '.json'],
      alias: {
        // '@views': path.resolve(__dirname, './src/views')
      }
    }

    return myConfig
  }
}
