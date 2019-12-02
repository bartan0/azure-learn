import JWT from 'jsonwebtoken'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import { SetMe, Store, Type } from 'azure-learn-webapp/actions'
import { getRoles } from 'azure-learn-webapp/lib'


function* login ({ functionappBaseURL }, { username, password }) {
	try {
		const res = yield call(fetch, `${functionappBaseURL}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-urlencoded' },
			body: new URLSearchParams({ username, password })
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
