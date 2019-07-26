const webpack = require('webpack')
const { override, addWebpackPlugin, addBabelPlugin, addLessLoader } = require('customize-cra')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

/**
 * 使用customize-cra 对 create-react-app 进行自定义配置
 */
module.exports = override(
  /** 打包分析 */
  // addWebpackPlugin(new BundleAnalyzerPlugin()),
  /** 启用less */
  addLessLoader(),
  addWebpackPlugin(
    /** 添加全局变量 */
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === 'development'
    })
  ),
  /** 按需加载lodash */
  addBabelPlugin('lodash')
)
