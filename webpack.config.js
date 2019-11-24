const { resolve } = require('path')


module.exports = {
	context: resolve(__dirname),
	entry: {
		'main.js': './webapp/index.js'
	},
	target: 'web',
	mode: 'development',

	output: {
		path: resolve(__dirname, 'dist', 'webapp'),
		filename: './_res/[name]'
	},

	module: {
		rules: [
			{ test: /\.js$/, use: {
				loader: 'babel-loader',
				options: {
					presets: [
						[ '@babel/preset-env', { targets: '> 1%, not dead' } ],
						'@babel/preset-react'
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
