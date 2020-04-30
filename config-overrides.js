const webpack = require('webpack')
const {
  override,
  fixBabelImports,
  addWebpackPlugin,
  addLessLoader
} = require('customize-cra')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

/**
 * 使用customize-cra 对 create-react-app 进行自定义配置
 */
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true // `style: true` 会加载 less 文件
  }),
  /** 启用less */
  addLessLoader({
    javascriptEnabled: true
  }),
  /** 打包分析 */
  // addWebpackPlugin(new BundleAnalyzerPlugin()),
  addWebpackPlugin(
    /** 添加全局变量 */
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === 'development'
    })
  )
)
