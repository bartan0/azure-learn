import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { createAppRoot } from './dom'
import Store from './store'
import Router from './router'
import Saga from './saga'


export default async () => {
	const root = await createAppRoot()
	const { saga, sagaRun } = Saga()
	const store = Store(saga)
	const app =
		<Provider store={store}>
			<Router/>
		</Provider>

	sagaRun()
	ReactDOM.render(app, root)
}
