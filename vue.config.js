// 此文件必须在项目根目录下
// 该文件可以看作是  webpack 的配置
// webpack 模块化，组件化开发的利器
// 基于nodejs的  --- vue的代理 其实就是 webpack的代理
module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
  }
}