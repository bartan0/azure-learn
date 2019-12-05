import 'regenerator-runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'

import { createAppRoot } from './lib/dom'
import { Initialize } from './actions'
import Store from './store'
import Router from './router'
import Saga from './saga'

import './index.html'


const main = async () => {
	const root = await createAppRoot()
	const history = createBrowserHistory()
	const { saga, sagaRun } = Saga({
		functionappBaseURL: __URL_FUNCTIONAPP,
		serverappBaseURL: __URL_SERVERAPP,
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
		dispatch: (type, payload) => store.dispatch({ type, ...payload }),
		get state () {
			return store.getState()
		}
	}
}


main()
