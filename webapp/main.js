import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { createAppRoot } from './dom'
import Store from './store'
import Router from './router'


export default async () => {
	const root = await createAppRoot()
	const store = Store()
	const app =
		<Provider store={store}>
			<Router/>
		</Provider>

	ReactDOM.render(app, root)
}
