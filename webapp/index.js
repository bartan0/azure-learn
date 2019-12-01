import 'regenerator-runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'

import { createAppRoot } from './dom'
import { Initialize } from './actions'
import Store from './store'
import Router from './router'
import Saga from './saga'

import './index.html'


const main = async () => {
	const root = await createAppRoot()
	const history = createBrowserHistory()
	const { saga, sagaRun } = Saga({
		baseURL: 'http://localhost:8100/api',
		history,
	})
	const store = Store(saga)
	const app =
		<Provider store={store}>
			<Router history={history}/>
		</Provider>

	sagaRun()
	store.dispatch(Initialize())
	ReactDOM.render(app, root)

	window.dev = {
		dispatch: action => store.dispatch(action),
		get state () {
			return store.getState()
		}
	}
}


main()
