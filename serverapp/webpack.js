const { resolve } = require('path')


module.exports = {
	context: resolve(__dirname, '..'),
	entry: {
		'main.js': './serverapp/index.js'
	},
	target: 'node',
	mode: 'development',

	output: {
		path: resolve(__dirname, '..', 'dist', 'serverapp'),
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
