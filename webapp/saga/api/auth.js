import JWT from 'jsonwebtoken'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import { SetMe, Store, Type } from 'azure-learn-webapp/actions'
import { getRoles } from 'azure-learn-webapp/lib'


// TEMPORARY IMPLEMENTATION FOR TESTING PURPOSES
//
function* login ({ username, password }) {
	try {
		yield call(fetch, 'http://localhost:8000/test/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		})

	} catch (err) {
		console.error(err)
	}
}


function* register ({ functionappBaseURL }, { username, password, adminKey }) {
	try {
		const res = yield call(fetch, `${functionappBaseURL}/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'x-www-urlencoded' },
			body: new URLSearchParams({ username, password, adminKey })
		})

		if (!res.ok)
			throw [ res.status, res.statusText ]

		const jwt = yield call([ res, 'text' ])

		yield put(Store('jwt', jwt))
		yield put(SetMe({ roles: getRoles(JWT.decode(jwt).roles) }))

	} catch (err) {
		console.error(err)
	}
}


export default function* (context) {
	yield all([
		[ Type.LOGIN, login ],
		[ Type.REGISTER, register ],
	]
		.map(([ action, saga ]) => takeEvery(action, saga, context))
	)
}
