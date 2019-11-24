import HTTP from 'http-status-codes'
import { MongoClient } from 'mongodb'

import 'file-loader?name=./login/function.json!./function.json.in'


const RE_AUTH_BASIC = /^Basic\s+([A-Za-z0-9+/]+={0,2})$/
const RE_AUTH_BASIC_UNAME_PASS = /^(\w+):(.*)$/


export default async ({ bindings: { req } }) => {
	const { MONGO_URL } = process.env
	const auth = req.headers.authorization

	if (!auth)
		return { res: { status: HTTP.BAD_REQUEST, body: '' } }

	const creds = Buffer.from((RE_AUTH_BASIC.exec(auth) || [])[1] || '', 'base64').toString()
	const [ _, username, password ] = RE_AUTH_BASIC_UNAME_PASS.exec(creds) || []

	if (!username || !password)
		return { res: { status: HTTP.BAD_REQUEST, body: '' } }

	const conn = await MongoClient.connect(MONGO_URL, { useUnifiedTopology: true })

	await conn.db().collection('users').insertOne({
		username,
		password
	})

	return { res: {
		status: HTTP.OK,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password, mongo: MONGO_URL })
	} }
}
