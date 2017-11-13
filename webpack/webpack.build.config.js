const webpack = require('webpack')
const merge = require('webpack-merge')
const {resolve} = require('path')
const baseWebpackConfig = require('./wabpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')
const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
    }),
    pxtorem({rootValue: 100, propWhiteList: []})
  ]
}
module.exports = merge(
  baseWebpackConfig,
  {
    entry: [
      // app的入口文件
      './app/index.jsx'
    ],
    context: resolve(__dirname, '../src'),
    output: {
      // 输出的打包文件
      filename: '[name].js',
      // 输出文件路劲
      path: resolve(__dirname, '../dist'),
      // 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
      publicPath: './'
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'antd-mobile': 'AntdMobile'
    },
    // 模块处理
    module: {
      // 模块处理规则
      rules: [
        // 解析less代码
        {
          test: /\.(less|css)$/i,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {loader: 'postcss-loader', options: postcssOpts},
              'less-loader'
            ]
          })
        }
      ]
    },
    plugins: [
      // 样式导出配置
      new ExtractTextPlugin('styles.css'),
      // 环境配置
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ],
    // 解析方式设置
    resolve: {}
  }
)
