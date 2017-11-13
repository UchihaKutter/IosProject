const webpack = require('webpack')
const merge = require('webpack-merge')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const {resolve} = require('path')
const baseWebpackConfig = require('./wabpack.base.config')

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

// 项目访问端口
const port = 8000
module.exports = merge(
  baseWebpackConfig,
  {
    entry: [
      'babel-polyfill',
      // 开启react代码的模块热替换（HMR）
      // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false',
      'react-hot-loader/patch',
      // 为webpack-dev-server的环境打包好运行代码
      // 然后连接到指定服务器域名与端口
      // 'webpack-dev-server/client?http://0.0.0.0:' + port,
      // 为热替换（HMR）打包好运行代码
      // only- 意味着只有成功更新运行代码才会执行热替换（HMR）
      // 'webpack/hot/only-dev-server',
      // app的入口文件
      './app/index.jsx'
    ],
    context: resolve(__dirname, '../src'),
    output: {
      // 输出的打包文件
      filename: '[name].js',
      // 输出文件路劲
      path: resolve(__dirname, 'dist'),
      // 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
      publicPath: '/'
    },
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true,
      port: port,
      // 开启服务器的模块热替换（HMR）
      hot: true,
      // 开启服务器输出文件的路径
      contentBase: resolve(__dirname, 'src'),
      // 和上文output的"publicPath"值保持一致
      publicPath: '/'
    },
    // 模块处理
    module: {
      // 模块处理规则
      rules: [
        // 解析less代码
        {
          test: /\.(less|css)$/i,
          use: [
            'style-loader',
            'css-loader',
            {loader: 'postcss-loader', options: postcssOpts},
            'less-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      // 开启全局的模块热替换（HMR）
      new webpack.HotModuleReplacementPlugin(),
      // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
      new webpack.NamedModulesPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({url: `http://localhost:${port}`}),
      // 环境配置
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      })
    ],
    // 解析方式设置
    resolve: {
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
)
