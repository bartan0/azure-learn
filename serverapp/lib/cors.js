import HTTP from 'http-status-codes'


const { CORS_ALLOWED_ORIGINS } = process.env
const CORS_METHODS = [
	'GET',
	'POST',
]
const CORS_HEADERS = [
	'Authorization',
	'Content-Type',
]

export default () => {
	const origins = CORS_ALLOWED_ORIGINS
		.trim()
		.split(/\s+/)
	const methods = CORS_METHODS.join(', ')
	const headers = CORS_HEADERS.join(', ')

	return (req, res, next) => {
		const origin = req.get('Origin')

		if (!origins.includes(origin))
			return res
				.status(HTTP.FORBIDDEN)
				.end()

		res
			.set('Access-Control-Allow-Origin', origin)
			.set('Access-Control-Allow-Methods', methods)
			.set('Access-Control-Allow-Headers', headers)

		if (req.method === 'OPTIONS')
			return res.status(HTTP.NO_CONTENT).end()

		next()
	}
}
