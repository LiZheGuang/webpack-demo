const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');  //清理dist
const entries = require('./src/build/entries.js')
const getEntry = require('./pageEntry')

function getBasePlugs () {
    var baseWebPackPlugin = []
    var pages = getEntry('./src/comment/*/index.html')
    for (var pathname in pages) {
      var pathInfo = pages[pathname]
      var pageName = path.basename(pathInfo)
      var folderName = pathInfo.split('/').splice(-2)[0]
      var fileName = `${folderName}.html`
  
      var conf = {
            title: 'Output Management',
            filename: fileName,
            template:'./src/comment/index/index.html',
            staticPath: 'mb52-static-parent',
            inject: true,
            hash: false,
            minify:false
          
      }
      if (pathname in entries) {
        conf.chunks = ['vendor','manifest', pathname]
      }
      baseWebPackPlugin.push(new HtmlWebpackPlugin(conf))
    }
    return baseWebPackPlugin
  }

module.exports = {
    entry: entries(),

    output: {
        filename: '[name].js',
        path: __dirname+'/dist',
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true), // const PRODUCTION = true
            VERSION: JSON.stringify('5fa3b9'), // const VERSION = '5fa3b9'
            BROWSER_SUPPORTS_HTML5: true, // const BROWSER_SUPPORTS_HTML5 = 'true'
            TWO: '1+1', // const TWO = 1 + 1,
            CONSTANTS: {
                APP_VERSION: JSON.stringify('1.1.2') // const CONSTANTS = { APP_VERSION: '1.1.2' }
            }
        }),
        
    ].concat(getBasePlugs()),
    module: {
        rules: [
            {
                test: /\.css/,
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ]
            }, {
                test: /\.jsx?/, // 支持 js 和 jsx
                include: [
                    path.resolve(__dirname, 'src'), // src 目录下的才需要经过 babel-loader 处理
                ],
                loader: 'babel-loader',
            }
        ]
    },
    resolve: {
        alias: {
            util: path.resolve(__dirname, 'src/util'), // 这里使用 path.resolve 和 __dirname 来获取绝对路径
            log$: path.resolve(__dirname, 'src/util/log.js') // 只匹配 log
        },
        extensions: ['.js', '.json', '.jsx', '.css', '.less'],
        modules: [
            path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
        ],
    }
}