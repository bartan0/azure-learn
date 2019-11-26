import JWT from 'jsonwebtoken'


export default ({ _id, roles }) => new Promise((resolve, reject) => {
	const { JWT_SECRET } = process.env

	JWT.sign(
		{ id: _id.toString(), roles },
		JWT_SECRET,
		(err, jwt) => {
			if (err)
				reject(err)
			else
				resolve(jwt)
		}
	)
})
