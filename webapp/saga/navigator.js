import { call, takeEvery } from 'redux-saga/effects'

import { Type } from 'azure-learn-webapp/actions'


function* navigate (history, { uri }) {
	yield call([ history, 'push' ], uri)
	yield call([ history, 'goForward' ])
}


export default function* ({ history }) {
	yield takeEvery(Type.NAVIGATE, navigate, history)
}
