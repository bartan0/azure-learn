import { combineReducers } from 'redux'


const roles = (
	roles = {
		admin: false,
		anonymous: true,
		user: false,
	},
	{ type, payload }
) => {
	switch (type) {

		default:
			return roles
	}
}


export default combineReducers({
	roles,
})
