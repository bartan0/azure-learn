import { pbkdf2, randomBytes } from 'crypto'


const KEY_LENGTH = 32
const SALT_LENGTH = 8
const HASH = 'sha256'
const ITERATIONS = 32*1024


export const key = passwd => new Promise(resolve =>
	randomBytes(SALT_LENGTH, (err, salt) =>
		pbkdf2(passwd, salt, ITERATIONS, KEY_LENGTH, HASH, (err, key) =>
			resolve(`${ITERATIONS}.${salt.toString('hex')}.${key.toString('hex')}`)
		)
	)
)


export const verify = (passwd, fullKey) => new Promise(resolve => {
	const [ iterations, salt, key ] = fullKey.split('.')

	pbkdf2(passwd, Buffer.from(salt, 'hex'), +iterations, KEY_LENGTH, HASH, (err, _key) =>
		resolve(_key.toString('hex') === key)
	)
})
