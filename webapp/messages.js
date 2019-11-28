const messages = {
	LOGIN_USERNAME_REQUIRED: 'Username is required',
	LOGIN_PASSWORD_REQUIRED: 'Password is required',
}


export default key => messages[key] || key
