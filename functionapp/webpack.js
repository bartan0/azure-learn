const { resolve } = require('path')


const { MODE } = process.env

const isProduction = MODE === 'production'


module.exports = {
	context: resolve(__dirname, '..'),
	entry: {
		'./index.js': './functionapp/index.js',
		'./login/index.js': './functionapp/login/index.js',
		'./register/index.js': './functionapp/register/index.js',
	},
	target: 'node',
	mode: isProduction ? 'production' : 'development',

	output: {
		path: resolve(__dirname, '..', isProduction ? 'dist-prod' : 'dist', 'functionapp'),
		filename: '[name]',
		libraryTarget: 'commonjs'
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
