const { resolve } = require('path')


const { MODE } = process.env

const isProduction = MODE === 'production'


module.exports = {
	context: resolve(__dirname, '..'),
	entry: {
		'main.js': './serverapp/index.js'
	},
	target: 'node',
	mode: isProduction ? 'production' : 'development',

	output: {
		path: resolve(__dirname, '..', isProduction ? 'dist-prod' : 'dist', 'serverapp'),
		filename: './[name]'
	},

	module: {
		rules: [
			{ test: /\.js$/, use: {
				loader: 'babel-loader',
				options: {
					presets: [
						[ '@babel/preset-env', { targets: { node: '10' } } ],
					]
				}
			} }
		]
	}
}
