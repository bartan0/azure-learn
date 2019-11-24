import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { createAppRoot } from './dom'
import Store from './store'
import UI from './ui'


export default async () => {
	const root = await createAppRoot()
	const store = Store()
	const app =
		<Provider store={store}>
			<UI/>
		</Provider>

	ReactDOM.render(app, root)
}
