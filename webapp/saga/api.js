import { call, takeEvery } from 'redux-saga/effects'


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


export default function* () {
	yield takeEvery('LOGIN', login)
}
