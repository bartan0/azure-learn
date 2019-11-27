import HTTP from 'http-status-codes'

import { ID } from 'azure-learn-serverapp/mongo'
import { requireJSON } from 'azure-learn-serverapp/lib/validation'


export const getUserTasks = (
	{ authz: { id: userId }, context: { db } },
	res
) => {
	const cursor = db('tasks')
		.find({ userId: ID(userId) })
		.project({ userId: 0 })

	cursor.forEach(
		({ _id, ...rest }) => res.write(`${JSON.stringify({
			id: _id.toString(),
			...rest
		})}\n`),
		() => res.end()
	)
}


export const createTask = [
	requireJSON,
	(
		{
			authz: { id: userId },
			body,
			context: { db },
		},
		res
	) => {
		if (!body.content) {
			throw HTTP.BAD_REQUEST
		}

		db('tasks')
			.insertOne({
				content: body.content,
				userId: ID(userId),
			})
			.then(({ insertedId }) => res.end(`${insertedId.toString()}\n`))
	}
]
