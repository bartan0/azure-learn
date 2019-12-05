const { resolve } = require('path')
const { DefinePlugin } = require('webpack')


const { MODE, URL_FUNCTIONAPP, URL_SERVERAPP } = process.env

const isProduction = MODE === 'production'


module.exports = {
	context: resolve(__dirname, '..'),
	entry: {
		'main.js': './webapp/index.js'
	},
	target: 'web',
	mode: MODE || 'development',

	output: {
		path: resolve(__dirname, '..', isProduction ? 'dist-prod' : 'dist', 'webapp'),
		filename: './_res/[name]'
	},

	plugins: [
		new DefinePlugin([
			[ '__MODE', MODE ],
			[ '__URL_FUNCTIONAPP', URL_FUNCTIONAPP ],
			[ '__URL_SERVERAPP', URL_SERVERAPP ],
		].reduce(
			(acc, [ k, v ]) => {
				acc[k] = JSON.stringify(v)

				return acc
			},
			{}
		))
	],

	module: {
		rules: [
			{ test: /\.js$/, use: {
				loader: 'babel-loader',
				options: {
					presets: [
						[ '@babel/preset-env', { targets: '> 1%, not dead' } ],
						'@babel/preset-react'
					],
					plugins: [
						'@babel/plugin-proposal-export-default-from'
					]
				}
			} },
			{ test: /\.html$/, use: [
				{ loader: 'file-loader', options: { name: 'index.html' } },
				'extract-loader',
				'html-loader'
			] }
		]
	}
}
