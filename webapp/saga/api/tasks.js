import { all, call, put, takeEvery} from 'redux-saga/effects'

import { Type, SetTasks, LoadTasks } from 'azure-learn-webapp/actions'
import { load as storageLoad } from 'azure-learn-webapp/saga/storage'


function* create ({ serverappBaseURL }, { content }) {
	try {
		const jwt = yield call(storageLoad, 'jwt')
		const res = yield call(fetch, `${serverappBaseURL}/tasks`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${jwt}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content })
		})

		if (!res.ok)
			throw [ res.status, res.statusText ]

		// const id = yield call([ res, 'text' ])

		// A temporary way to make the new task appear as well
		//
		yield put(LoadTasks())

	} catch (err) {
		console.error(err)
	}
}


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
		[ Type.TASK_CREATE, create ],
		[ Type.TASKS_LOAD, load ],
	]
		.map(([ type, saga ]) => takeEvery(type, saga, context))
	)
}
