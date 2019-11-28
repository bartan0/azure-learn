import React from 'react'

import LoginForm from './login-form'
import RegisterForm from './register-form'


export const Mode = {
	LOGIN: 'LOGIN',
	REGISTER: 'REGISTER',
}


export default ({
	mode
}) => {
	switch (mode) {

		case Mode.LOGIN:
			return <LoginForm/>

		case Mode.REGISTER:
			return <RegisterForm/>
	}
}
