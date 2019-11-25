import HTTP from 'http-status-codes'
import qs from 'querystring'
import { MongoClient } from 'mongodb'

import 'file-loader?name=./register/function.json!./function.json.in'


const addUser = async (username, password) => {
	const { MONGO_URL } = process.env

	const users = await MongoClient.connect(MONGO_URL)
		.then(conn => conn.db().collection('users'))

	if (await users.findOne({ username }))
		throw null

	await users.insertOne({ username, password })
}


export default async ({ bindings: { req } }) => {
	const { username, password } = qs.parse(req.body)

	try {
		await addUser(username, password)

		return { res: {
			status: HTTP.OK,
			body: ''
		} }

	} catch (err) {
		return { res: {
			status: HTTP.BAD_REQUEST,
			body: ''
		} }
	}
}
