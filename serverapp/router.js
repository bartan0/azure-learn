import HTTP from 'http-status-codes'
import { Router } from 'express'


export default () => {
	return Router()
		.use((req, res) => {
			res.status(HTTP.NOT_FOUND)
				.end()
		})
}
