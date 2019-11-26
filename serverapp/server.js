import HTTP from 'http-status-codes'
import express from 'express'

import CORS from './lib/cors'
import Router from './router'


const { PORT } = process.env

export default context => {
	const router = Router()
	const cors = CORS()

	const server = express()
		.use((req, res, next) => {
			req.context = context
			next()
		})
		.options('*', cors)
		.use(router)
		.use((err, req, res, next) => {
			console.error(`Serverapp: Error: ${err}`)

			res
				.status(HTTP.INTERNAL_SERVER_ERROR)
				.end(':(')
		})

		.on('close', () => {
			console.log('Serverapp: server closed')
		})
		.listen(PORT, () => {
			const { address, port } = server.address()

			console.log(`Serverapp: listening @${address}:${port}`)
		})

	return server
}
