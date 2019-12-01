import { all, call, put, takeEvery} from 'redux-saga/effects'

import { Type, SetTasks } from 'azure-learn-webapp/actions'
import { load as storageLoad } from 'azure-learn-webapp/saga/storage'


function* load ({ serverappBaseURL }) {
	try {
		const jwt = yield call(storageLoad, 'jwt')
		const res = yield call(fetch, `${serverappBaseURL}/tasks`, {
			method: 'GET',
			headers: { 'Authorization': `Bearer ${jwt}` }
		})

		if (!res.ok)
			throw [ res.status, res.statusText ]

		const payload = yield call([ res, 'text' ])
		const tasks = payload.split('\n')
			.filter(Boolean)
			.map(line => JSON.parse(line))

		yield put(SetTasks(tasks))

	} catch (err) {
		console.error(err)
	}
}


export default function* (context) {
	yield all([
		[ Type.TASKS_LOAD, load ]
	]
		.map(([ type, saga ]) => takeEvery(type, load, context))
	)
}
