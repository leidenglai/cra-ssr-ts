const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')

const serverConfig = {
  mode: 'production',
  entry: { server: './src/server.js' },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: {
    console: true,
    process: true,
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            cacheDirectory: true,
            caller: 'node',
          },
        },
      },
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-typescript'],
              plugins: ['@babel/plugin-syntax-dynamic-import'],
              cacheDirectory: true,
              caller: 'node',
              env: {
                production: {
                  presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                  ],
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(le|c)ss$/,
        loader: ['css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 10, // 10kb以下装base64格式
          name: 'img/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  optimization: {
    minimize: false, // <---- disables uglify.
  },
  externals: nodeExternals(),
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, '../src')],
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
    // 将node需要的模板文件拷贝到生产环境
    new CopyPlugin([
      {
        from: path.resolve(__dirname, '../build/index.html'),
        to: path.resolve(__dirname, 'build/view/index.html'),
      },
      {
        from: path.resolve(__dirname, 'package.json'),
        to: path.resolve(__dirname, 'build/package.json'),
      },
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      // ================================
      // 配置开发全局常量
      // ================================
      __DEV__: false,
      __PROD__: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 500000, // Minimum number of characters
    }),
    // 进度条
    new ProgressBarPlugin(),
  ],
}

module.exports = serverConfig
