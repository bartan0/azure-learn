const messages = {
	LOGIN_USERNAME_REQUIRED: 'Username is required',
	LOGIN_PASSWORD_REQUIRED: 'Password is required',
	CREATE_TASK_CONTENT_REQUIRED: 'Content is required',
}


export default key => messages[key] || key
