import JWT from 'jsonwebtoken'
import { all, call, put, takeEvery } from 'redux-saga/effects'

import {
	Type,
	SetMe,
} from 'azure-learn-webapp/actions'


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


function* register ({ baseURL }, { username, password }) {
	try {
		const res = yield call(fetch, `${baseURL}/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'x-www-urlencoded' },
			body: new URLSearchParams({ username, password })
		})

		if (!res.ok)
			throw [ res.status, res.statusText ]

		const jwt = yield call([ res, 'text' ])
		const { roles } = JWT.decode(jwt)

		yield put(SetMe({ roles: {
			admin: roles.includes('admin'),
			anonymous: false,
			user: roles.includes('user'),
		} }))

	} catch (err) {
		console.error(err)
	}
}


export default function* (context) {
	/*
	yield all([
		[ Type.LOGIN, login ],
		[ Type.REGISTER, register ],
	].map((action, saga) => takeEvery(action, saga, context)))
	*/
	yield takeEvery(Type.REGISTER, register, context)
}
