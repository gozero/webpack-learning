const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const extractCss = new ExtractTextPlugin({
  filename: '[name].[contenthash]-c.css',
  disable: false
})


const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash]-s.css',
  disable: false // disable设置会覆盖上面的设置
})


module.exports = {
  entry: {
    main: './src/index.js',
    a: './src/a.js',
    b: './src/b.js',
    vendor: [
      'jquery',
      'lodash',
    ],
    polyfill: 'babel-polyfill'

  },
  devServer: {
    contentBase: './dist',
    // hot: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              // useBuiltIns: 'usage',
              // debug: true
            }]
          ]
        }
      }
    }, {
      test: /\.css$/,
      use: extractCss.extract({
        fallback: "style-loader",
        // use: ['css-loader']
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      })
    }, {
      test: /\.scss$/,
      use: extractSass.extract({
        // fallback: 'style-loader',
        // use: [
        //   'css-loader',
        //   'sass-loader'
        // ],
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader'
        ]
      })
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }, {
      test: /\.(csv|tsv)$/,
      use: [
        'csv-loader'
      ]
    }, {
      test: /\.xml$/,
      use: [
        'xml-loader'
      ]
    }]
  },
  plugins: [
    extractCss,
    extractSass,
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Mi',
      template: './src/my-index.ejs',
    }),
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.HotModuleReplacementPlugin(), // 在开启服务器环境中出现chunkhash的bug
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    }), // CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ],
  output: {
    filename: '[name].[chunkhash].js', // '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
