import { all, call, takeEvery } from 'redux-saga/effects'

import { Type } from 'azure-learn-webapp/actions'


function* store ({ key, value }) {
	yield call([ localStorage, 'setItem' ], key, value)
}


export function* load (key) {
	return yield call([ localStorage, 'getItem' ], key)
}


export function* remove (key) {
	yield call([ localStorage, 'removeItem' ], key)
}


export default function* (context) {
	yield takeEvery(Type.STORE, store)
}
