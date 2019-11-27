import HTTP from 'http-status-codes'
import { Router } from 'express'

import getAuthz from './lib/jwt'


export default () => {
	return Router()
		.use(async (req, res, next) => {
			try {
				req.authz = await getAuthz(req)
				next()

			} catch (err) {
				console.error(err)
				res.status(HTTP.UNAUTHORIZED).end()
			}
		})
		.use((req, res) => {
			res.status(HTTP.NOT_FOUND).end()
		})
}
