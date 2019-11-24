import React from 'react'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'

import { AdminPanel, LoginPanel, TasksView } from './ui'


export default connect(
	({ me }) => ({ me })
)(({
	me: { roles }
}) => {
	const { admin, anonymous, user } = roles

	return (
		<Router>
			<Switch>
				{admin && <Route path="/" render={() => <AdminPanel/>}/>}
				{anonymous && <Route path="/login" render={() => <LoginPanel/>}/>}
				{user && <Route path="/" render={() => <TasksView/>}/>}

				{anonymous && <Redirect to="/login"/>}
				<Redirect to="/"/>
			</Switch>
		</Router>
	)
})
