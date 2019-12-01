import JWT from 'jsonwebtoken'
import { call, put, takeEvery } from 'redux-saga/effects'

import { getRoles } from 'azure-learn-webapp/lib'
import { Type, SetMe } from 'azure-learn-webapp/actions'

import { load } from './storage'


function* init () {
	const jwt = yield call(load, 'jwt')

	if (jwt)
		yield put(SetMe({ roles: getRoles(JWT.decode(jwt).roles) }))
}


export default function* () {
	yield takeEvery(Type.INITIALIZE, init)
}
