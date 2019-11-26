import HTTP from 'http-status-codes'


const { CORS_ALLOWED_ORIGINS } = process.env
const CORS_METHODS = [
	'GET',
	'POST',
]

export default () => {
	const origins = CORS_ALLOWED_ORIGINS
		.trim()
		.split(/\s+/)
	const methods = CORS_METHODS.join(', ')

	return (req, res) => {
		const origin = req.get('Origin')

		if (!origins.includes(origin))
			return res
				.status(HTTP.FORBIDDEN)
				.end()

		res.status(HTTP.NO_CONTENT)
			.set('Access-Control-Allow-Origin', origin)
			.set('Access-Control-Allow-Methods', methods)
			.end()
	}
}
