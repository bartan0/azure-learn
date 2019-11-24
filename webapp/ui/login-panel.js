import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Login } from 'azure-learn-webapp/actions'
import Messages from 'azure-learn-webapp/messages'


const validate = ({
	username: { value: username },
	password: { value: password },
}, cb) => {
	const errors = []

	if (!username)
		errors.push({ field: 'username', msgKey: 'LOGIN_USERNAME_REQUIRED' })

	if (!password)
		errors.push({ field: 'password', msgKey: 'LOGIN_PASSWORD_REQUIRED' })

	cb(
		errors.length ? errors : null,
		{ username, password }
	)
}


export default connect(
	null,
	dispatch => ({
		onLogin: (model) => dispatch(Login(model))
	})
)(({
	onLogin,
}) => {
	const [ errors, setErrors ] = useState([])
	const submit = ev => {
		ev.preventDefault()

		validate(ev.target.elements, (errors, model) => {
			if (errors)
				setErrors(errors)
			else {
				setErrors([])
				onLogin(model)
			}
		})
	}

	return (
		<form
			onSubmit={submit}
		>
			<label>
				<span>Username:</span>
				<input type="text" name="username"/>
				{errors
					.filter(({ field }) => field === 'username')
					.map(({ msgKey }) =>
						<span key={msgKey}>{Messages[msgKey]}</span>
					)
				}
			</label>

			<label>
				<span>Password:</span>
				<input type="password" name="password"/>
				{errors
					.filter(({ field }) => field === 'password')
					.map(({ msgKey }) =>
						<span key={msgKey}>{Messages[msgKey]}</span>
					)
				}
			</label>

			<button>Login</button>
		</form>
	)
})
