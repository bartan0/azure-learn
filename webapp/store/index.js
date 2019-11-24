import { combineReducers, createStore } from 'redux'

import me from './me'


export default () => createStore(combineReducers({
	me,
	$: (state = null, { type, payload }) => {
		switch (type) {
			case 'LOGIN':
				console.log(type, payload)

			default:
				return state
		}
	}
}))
