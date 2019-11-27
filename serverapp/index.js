import DB from './mongo'
import Server from './server'


const main = async () => {
	console.log('Serverapp: starting')

	const db = await DB()
	const server = Server({ db })

	;[ 'SIGINT', 'SIGTERM' ].forEach(sig => process.on(sig, () => {
		server.close(() => process.exit())
	}))
}


main()
