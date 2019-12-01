import { applyMiddleware, combineReducers, createStore } from 'redux'

import me from './me'
import tasks from './tasks'
import users from './users'


export default saga => createStore(combineReducers({
	me,
	tasks,
	users,
}), undefined, applyMiddleware(saga))
