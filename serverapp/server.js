import HTTP from 'http-status-codes'
import express, { json } from 'express'

import CORS from './lib/cors'
import Router from './router'


const { PORT } = process.env

export default context => {
	const server = express()
		.use((req, res, next) => {
			req.context = context
			next()
		})
		.use((req, res, next) => {
			console.log(`${req.method} ${req.url}`)

			next()
		})
		.use(CORS())
		.use(json())
		.use(Router())
		.use((err, req, res, next) => {
			console.error(`Serverapp: Error: ${err}`)

			res
				.status(HTTP.INTERNAL_SERVER_ERROR)
				.end(':(')
		})

		.listen(PORT, () => {
			const { address, port } = server.address()

			console.log(`Serverapp: listening @${address}:${port}`)
		})
		.on('close', () => {
			console.log('Serverapp: server closed')
		})

	return server
}
