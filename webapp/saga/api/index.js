import { all, call } from 'redux-saga/effects'

import auth from './auth'
import tasks from './tasks'
import users from './users'


export default function* (context) {
	yield all([
		auth,
		tasks,
		users,
	]
		.map(saga => call(saga, context))
	)
}
