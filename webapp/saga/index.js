import Saga from 'redux-saga'
import { all, call } from 'redux-saga/effects'

import api from './api'
import init from './init'
import log from './log'
import navigator from './navigator'
import storage from './storage'


export default context => {
	const saga = Saga()

	return {
		saga,
		sagaRun: () => saga.run(function* () {
			yield all([
				api,
				init,
				log,
				navigator,
				storage,
			]
				.map(saga => call(saga, context))
			)
		})
	}
}
