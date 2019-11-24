import { takeEvery } from 'redux-saga/effects'


const log = ({ type, ...payload }) => {
	console.log(`ACTION ${type}:`, payload)
}


export default function* () {
	yield takeEvery('*', log)
}
