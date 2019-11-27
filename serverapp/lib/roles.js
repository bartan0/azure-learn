import HTTP from 'http-status-codes'


export const requireAdmin = ({ authz: { roles } }, res, next) => {
	console.log('ROLES', roles)

	if (!roles.includes('admin'))
		return res.status(HTTP.FORBIDDEN).end()

	next()
}


export const requireUser = ({ authz: { roles } }, res, next) => {
	if (!roles.some(role => [ 'admin', 'user' ].includes(role)))
		return res.status(HTTP.FORBIDDEN).end()

	next()
}
