import React from 'react'
import { connect } from 'react-redux'
import {
	Redirect,
	Route,
	Router,
	Switch,
} from 'react-router-dom'

import { AdminPanel, AuthPanel, TasksView } from './ui'
import { Mode as AuthPanelMode } from './ui/auth-panel'


export default connect(
	({ me }) => ({ me })
)(({
	me: { roles },
	...rest
}) => {
	const { admin, anonymous, user } = roles

	return (
		<Router {...rest}>
			<Switch>
				{admin && <Route exact path="/" render={() => <AdminPanel/>}/>}
				{anonymous && <Route exact path="/login" render={() => <AuthPanel mode={AuthPanelMode.LOGIN}/>}/>}
				{anonymous && <Route exact path="/register" render={() => <AuthPanel mode={AuthPanelMode.REGISTER}/>}/>}
				{user && <Route exact path="/" render={() => <TasksView/>}/>}

				{anonymous && <Redirect to="/login"/>}
				<Redirect to="/"/>
			</Switch>
		</Router>
	)
})
