import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Login, Navigate } from 'azure-learn-webapp/actions'
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
		onGoRegister: () => dispatch(Navigate('/register')),
		onLogin: model => dispatch(Login(model)),
	})
)(({
	onGoRegister,
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
			<div>
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
			</div>

			<div>
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
			</div>

			<div>
				<button>Login</button>
				<button
					type="button"
					onClick={onGoRegister}
				>Register</button>
			</div>
		</form>
	)
})
