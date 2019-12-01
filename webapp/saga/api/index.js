import { all, call } from 'redux-saga/effects'

import auth from './auth'
import tasks from './tasks'


export default function* (context) {
	yield all([
		auth,
		tasks,
	]
		.map(saga => call(saga, context))
	)
}
