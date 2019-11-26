import { MongoClient } from 'mongodb'


const { MONGO_URL } = process.env

export default async () => {
	const db = await MongoClient.connect(MONGO_URL, {
		useUnifiedTopology: true
	})
		.then(conn => conn.db())

	return collName => db.collection(collName)
}
