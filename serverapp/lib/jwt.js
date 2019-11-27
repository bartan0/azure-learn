import JWT from 'jsonwebtoken'


const { JWT_SECRET } = process.env

export default async req => new Promise((resolve, reject) => {
	const authzHeader = req.get('Authorization') || ''

	if (!authzHeader.startsWith('Bearer '))
		reject('authorization_header_wrong_value')

	JWT.verify(authzHeader.slice(7), JWT_SECRET, (err, authz) => {
		if (err)
			reject(err)
		else
			resolve(authz)
	})
})
