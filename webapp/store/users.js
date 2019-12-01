import { Type } from 'azure-learn-webapp/actions'


export default (users = [], { type, ...payload }) => {
	switch (type) {

		case Type.USERS_SET:
			return payload.users

		default:
			return users
	}
}
