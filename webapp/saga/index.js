import Saga from 'redux-saga'
import { all, call } from 'redux-saga/effects'

import api from './api'
import log from './log'


export default () => {
	const saga = Saga()

	return {
		saga,
		sagaRun: () => saga.run(function* () {
			yield all([
				api,
				log,
			]
				.map(call)
			)
		})
	}
}
