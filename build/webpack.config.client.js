const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: isDev ? '"development"' : '"production"'
		}
	}),
	new HTMLPlugin({
		template: path.join(__dirname, '../client/index.html')
	}),
	new VueClientPlugin()
];

const devServer = {
	port: 8000,
	host: 'localhost',
	overlay: {
		errors: true,
	},
	historyApiFallback: {
		index: '/public/index.html'
	},
	headers: {
		'Access-Control-Allow-Origin': '*'
	},
	proxy: {
		'/api': 'http://localhost:3333',
		'/user': 'http://localhost:3333'
	},
	hot: true
};
let config;

if (isDev) {
	config = merge(baseConfig, {
		entry: path.join(__dirname, '../client/client-entry.js'),
		devtool: '#cheap-module-eval-source-map',
		module: {
			rules: [
				{
					test: /\.styl/,
					use: [
						'vue-style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true,
							}
						},
						'stylus-loader'
					]
				}
			]
		},
		devServer,
		plugins: defaultPlugins.concat([
			new webpack.HotModuleReplacementPlugin(),
		]),
	});
}
else {
	config = merge(baseConfig, {
		entry: {
			app: path.join(__dirname, '../client/client-entry.js'),
			vendor: ['vue']
		},
		output: {
			filename: '[name].[chunkhash:8].js',
			publicPath: '/public/'
		},
		module: {
			rules: [
				{
					test: /\.styl/,
					use: ExtractPlugin.extract({
						fallback: 'vue-style-loader',
						use: [
							'css-loader',
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true,
								}
							},
							'stylus-loader'
						]
					})
				},
			]
		},
		optimization: {
			spliteChunks: {
				chunks: 'all'
			},
			runtimeChunk: true,
		},
		plugins: defaultPlugins.concat([
			new ExtractPlugin('styles.[hash:8].css'),
		]),
	});
}

module.exports = config;
