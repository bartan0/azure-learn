import qs from 'querystring'
import HTTP from 'http-status-codes'
import { MongoClient } from 'mongodb'

import 'file-loader?name=./login/function.json!./function.json.in'


const authenticate = async (username, password) => {
	const { MONGO_URL } = process.env

	const users = await MongoClient.connect(MONGO_URL)
		.then(conn => conn.db().collection('users'))

	return await users.findOne({ username, password })
}


export default async ({ bindings: { req } }) => {
	const { username, password } = qs.parse(req.body)

	if (await authenticate(username, password))
		return { res: {
			status: HTTP.OK,
			body: ':)'
		} }

	return { res: {
		status: HTTP.UNAUTHORIZED,
		body: ':('
	} }
}
