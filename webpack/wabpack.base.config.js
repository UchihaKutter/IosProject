// require('es6-promise').polyfill()

const path = require('path')
const resolve = path.resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 模块处理
  module: {
    // 模块处理规则
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          useEslintrc: false,
          configFile: './.eslintrc'
        }
      },
      // 解析ECMAScript代码
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /(node_modules|bower_components)/
      },
      // // 解析less代码
      // {
      //   test: /\.(less|css)$/i,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       'css-loader',
      //       { loader: 'postcss-loader', options: postcssOpts },
      //       'less-loader'
      //     ]
      //   })
      // },
      // 解析less代码
      // {
      //   test: /\.css$/i,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       'css-loader',
      //       { loader: 'postcss-loader', options: postcssOpts }
      //     ]
      //   })
      // },
      {
        test: /\.(jpg|png|gif|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [
          require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
          path.resolve(__dirname, '../src/app/assets/svg/') // 2. 自己私人的 svg 存放目录
        ]
      }
    ]
  },
  // plugins: [
  //   // dist目录下生成html模板文件
  //   new HtmlWebpackPlugin({
  //     template: './app/index.html'
  //   })
  // ],
  // 解析方式设置
  resolve: {
    // 自动解析拓展名
    extensions: ['.web.js', '.js', '.json', '.jsx', '.less', '.css'],
    alias: {
      containers: resolve(__dirname, '../src/app/containers/'),
      components: resolve(__dirname, '../src/app/components/'),
      assets: resolve(__dirname, '../src/app/assets/'),
      stores: resolve(__dirname, '../src/app/stores/'),
      theme: resolve(__dirname, '../src/app/theme/'),
      http: resolve(__dirname, '../src/app/http/'),
      utils: resolve(__dirname, '../src/app/utils/')
    }

  }
}
