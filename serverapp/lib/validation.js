import HTTP from 'http-status-codes'


export const requireJSON = (req, res, next) => {
	if (req.get('Content-Type') !== 'application/json')
		throw HTTP.BAD_REQUEST

	next()
}
