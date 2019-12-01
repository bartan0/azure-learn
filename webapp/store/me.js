import { combineReducers } from 'redux'

import { Type } from 'azure-learn-webapp/actions'


const roles = (
	roles = {
		admin: false,
		anonymous: true,
		user: false,
	},
	{ type, ...payload }
) => {
	switch (type) {

		case Type.SET_ME:
			return payload.roles

		default:
			return roles
	}
}


export default combineReducers({
	roles,
})
