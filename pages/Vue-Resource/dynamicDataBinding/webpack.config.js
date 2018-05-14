var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');

function publicPath(){
  if(process.env.NODE_ENV === 'production'){
    return '/dist/'
  }else{
    return '/dist/'
  }
}
module.exports = {
  entry: {
        index: ['./src/index.js'],
        example: ['./example/index.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js"
    },
    module: {
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         loader: "eslint-loader",
        //         exclude: /node_modules/
        //     }
        // ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './example/index.html'}
        ], {})
    ]
}


if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      // sourceMap: true,
      compress: {
        warnings: false
      }
    })/* 此配置会去掉css中的前缀 所以去除,
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })*/
  ]
}