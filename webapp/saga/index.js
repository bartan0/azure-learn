import Saga from 'redux-saga'
import { all, call } from 'redux-saga/effects'

import api from './api'
import log from './log'
import navigator from './navigator'


export default context => {
	const saga = Saga()

	return {
		saga,
		sagaRun: () => saga.run(function* () {
			yield all([
				api,
				log,
				navigator,
			]
				.map(saga => call(saga, context))
			)
		})
	}
}
