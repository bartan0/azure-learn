import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Register, Navigate } from 'azure-learn-webapp/actions'
import T from 'azure-learn-webapp/messages'


const validate = (controls, cb) => {
	const errors = []
	const {
		username: { value: username },
		password: { value: password },
		passwordRepeat: { value: passwordRepeat },
	} = controls

	if (!username)
		errors.push({ field: 'username', msgKey: 'LOGIN_USERNAME_REQUIRED' })

	if (!password)
		errors.push({ field: 'password', msgKey: 'LOGIN_PASSWORD_REQUIRED' })

	if (!passwordRepeat)
		errors.push({ field: 'passwordRepeat', msgKey: 'LOGIN_PASSWORD_REQUIRED' })

	if (password !== passwordRepeat)
		errors.push({ field: 'passwordRepeat', msgKey: 'LOGIN_PASSWORDS_MUST_MATCH' })

	cb(
		errors.length ? errors : null,
		{
			username,
			password,
			adminKey: (controls.adminKey || {}).value
		}
	)
}


export default connect(
	null,
	dispatch => ({
		onGoLogin: () => dispatch(Navigate('/login')),
		onRegister: model => dispatch(Register(model)),
	})
)(({
	onGoLogin,
	onRegister,
}) => {
	const [ errors, setErrors ] = useState([])
	const [ showAdvanced, setShowAdvanced ] = useState(false)
	const submit = ev => {
		ev.preventDefault()

		validate(ev.target.elements, (errors, model) => {
			if (errors)
				setErrors(errors)
			else {
				setErrors([])
				onRegister(model)
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
							<span key={msgKey}>{T(msgKey)}</span>
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
							<span key={msgKey}>{T(msgKey)}</span>
						)
					}
				</label>
			</div>

			<div>
				<label>
					<span>Repeat password:</span>
					<input type="password" name="passwordRepeat"/>
					{errors
						.filter(({ field }) => field === 'passwordRepeat')
						.map(({ msgKey }) =>
							<span key={msgKey}>{T(msgKey)}</span>
						)
					}
				</label>
			</div>

			<div>
				<label>
					<input
						checked={showAdvanced}
						type="checkbox"

						onChange={() => setShowAdvanced(v => !v)}
					/>
					<span>Show advanced options</span>
				</label>
			</div>

			{showAdvanced &&
				<div>
					<div>
						<label>
							<span>Admin key:</span>
							<input type="password" name="adminKey"/>
						</label>
					</div>
				</div>
			}

			<button>Register</button>
			<button
				type="button"
				onClick={onGoLogin}
			>Login</button>
		</form>
	)
})
