const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		'application': './src/app.tsx',
		'common-dependencies': [
			'react',
			'react-dom',
			'react-redux',
			'redux',
			'reselect',
			'redux-thunk'
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
		}),
		new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
	],
	devtool: 'source-map',
	externals: [
	],
};
