var webpack = require("webpack")
var path = require('path')

module.exports = {
	entry:'./pages/src/js/index.js',
	output:{
		path: path.resolve(__dirname, './pages/src/dist'),
		filename:'[name].js'
	},
	module:{
		loaders:[
			{test: /\.vue$/, loader: 'vue'},
			{
				test: /\.js$/,
				exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\//,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test:/\.css$/,
				loaders: ["style-loader","css-loader"]
			}
		]
	}
}