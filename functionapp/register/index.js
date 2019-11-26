import HTTP from 'http-status-codes'
import qs from 'querystring'
import { MongoClient } from 'mongodb'

import { key } from '../lib/pbkdf2'
import JWT from '../lib/jwt'

import 'file-loader?name=./register/function.json!./function.json.in'


const addUser = async (username, password, isAdmin = false) => {
	const { MONGO_URL } = process.env

	const users = await MongoClient.connect(MONGO_URL)
		.then(conn => conn.db().collection('users'))

	if (await users.findOne({ username }))
		throw null

	const roles = [ isAdmin ? 'admin' : 'user' ]
	const { insertedId } = await users.insertOne({
		username,
		key: await key(password),
		roles
	})

	return { _id: insertedId, roles }
}


export default async ({ bindings: { req } }) => {
	const { REGISTER_ADMIN_KEY } = process.env

	const { username, password, adminKey } = qs.parse(req.body)

	try {
		const authz = await addUser(username, password, adminKey === REGISTER_ADMIN_KEY)

		return { res: {
			status: HTTP.OK,
			body: await JWT(authz)
		} }

	} catch (err) {
		return { res: {
			status: HTTP.BAD_REQUEST,
			body: ''
		} }
	}
}
