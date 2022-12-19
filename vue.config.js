const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const proxyObj = {}
proxyObj['/'] = {
  target: 'http://192.168.70.184:8199',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}
module.exports = defineConfig({
  lintOnSave:false, 
  transpileDependencies: true,
  devServer:{
    // proxy:{
    //   '/dataset':{//表示拦截以/api开头的请求路径
    //     target:'http://192.168.70.184:8199/dataset/selectDataset',
    //     changOrigin: true,//是否开启跨域
    //     pathRewrite:{
    //       '^/dataset':'' //重写api，把api变成空字符，因为我们真正请求的路径是没有api的
    //     }
    //   }
    // }
  },
  configureWebpack: {
    resolve: {
      alias: {},
      fallback: {
        //其他的如果不启用可以用 keyname :false，例如：crypto:false, 
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify")
      },
    },
    plugins: [new NodePolyfillPlugin()]
  }


})
