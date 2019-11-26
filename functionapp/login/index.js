import qs from 'querystring'
import HTTP from 'http-status-codes'
import { MongoClient } from 'mongodb'

import { verify } from '../lib/pbkdf2'
import JWT from '../lib/jwt'

import 'file-loader?name=./login/function.json!./function.json.in'


const authenticate = async (username, password) => {
	const { MONGO_URL } = process.env

	const users = await MongoClient.connect(MONGO_URL)
		.then(conn => conn.db().collection('users'))

	const user = await users.findOne({ username })

	if (!user)
		throw 'user_not_found'

	if (await verify(password, user.key))
		return user
}


export default async ({ bindings: { req } }) => {
	const { username, password } = qs.parse(req.body)

	try {
		const user = await authenticate(username, password)

		return { res: {
			status: HTTP.OK,
			body: await JWT(user)
		} }

	} catch (err) {
		return { res: {
			status: HTTP.UNAUTHORIZED,
			body: ':('
		} }
	}
}
