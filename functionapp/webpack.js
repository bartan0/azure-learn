const { resolve } = require('path')


module.exports = {
	context: resolve(__dirname, '..'),
	entry: {
		'./index.js': './functionapp/index.js',
		'./login/index.js': './functionapp/login/index.js',
		'./register/index.js': './functionapp/register/index.js',
	},
	target: 'node',
	mode: 'development',

	output: {
		path: resolve(__dirname, '..', 'dist', 'functionapp'),
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
