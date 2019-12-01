import { applyMiddleware, combineReducers, createStore } from 'redux'

import me from './me'
import tasks from './tasks'


export default saga => createStore(combineReducers({
	me,
	tasks,
}), undefined, applyMiddleware(saga))
