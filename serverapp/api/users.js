export const getUsers = ({ context: { db } }, res) => {
	const cursor = db('users')
		.find()
		.project({ key: false })

	cursor.forEach(
		({ _id, ...rest }) => {
			res.write(JSON.stringify({
				id: _id.toString(),
				...rest
			}))
			res.write('\n')
		},
		() => res.end()
	)
}
