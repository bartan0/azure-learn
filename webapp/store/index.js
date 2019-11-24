import { applyMiddleware, combineReducers, createStore } from 'redux'

import me from './me'


export default saga => createStore(combineReducers({
	me,
}), undefined, applyMiddleware(saga))
