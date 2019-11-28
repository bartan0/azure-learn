const Action = (type, payload) => ({ type, ...payload })


export const Type = {
	LOGIN: 'ACTION::LOGIN',
	NAVIGATE: 'ACTION::NAVIGATE',
	REGISTER: 'ACTION::REGISTER',
}

export const Login = model => Action(Type.LOGIN, model)
export const Navigate = uri => Action(Type.NAVIGATE, { uri })
export const Register = model => Action(Type.REGISTER, model)
