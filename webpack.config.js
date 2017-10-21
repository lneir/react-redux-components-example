const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		'application': './src/index.ts',
		'application2': './src/index2.tsx',
		'navigation': './src/navigation/index.ts',
		'common-dependencies': [
			/* Just one version of react, too. react-router is fine to have multiple versions of,
			 * though, so no need to put it in common dependencies
			 */
			'react',
			'react-dom'
		],
	},
	output: {
		publicPath: '/dist/',
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		chunkFilename: '[name]-[chunkhash].js'
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				loader: 'babel-loader',
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			}
		],
	},
	node: {
		fs: 'empty'
	},
	resolve: {
		modules: [
			__dirname,
			'node_modules',
		],
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common-dependencies'
		})
	],
	devtool: 'source-map',
	externals: [
	],
};
