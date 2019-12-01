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
		const jwt = yield call([ res, 'text' ])

		yield put(SetMe(JWT.decode(jwt)))

	} catch {
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
