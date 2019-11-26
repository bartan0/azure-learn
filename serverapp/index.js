import DB from './mongo'
import Server from './server'


const main = async () => {
	const db = await DB()
	const server = Server({ db })

	process
		.on('SIGTERM', () => {
			server.close()
		})
		.on('SIGINT', () => {
			server.close()
		})
}


main()
