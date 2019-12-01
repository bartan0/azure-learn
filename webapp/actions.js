const Action = (type, payload) => ({ type, ...payload })


export const Type = {
	INITIALIZE: 'ACTION::INITIALIZE',
	LOGIN: 'ACTION::LOGIN',
	NAVIGATE: 'ACTION::NAVIGATE',
	REGISTER: 'ACTION::REGISTER',
	SET_ME: 'ACTION::SET_ME',
	SET_TASKS: 'ACTION::SET_TASKS',
	STORE: 'ACTION::STORE',
}

export const Initialize = () => Action(Type.INITIALIZE)
export const Login = model => Action(Type.LOGIN, model)
export const Navigate = uri => Action(Type.NAVIGATE, { uri })
export const Register = model => Action(Type.REGISTER, model)
export const SetMe = me => Action(Type.SET_ME, me)
export const SetTasks = tasks => Action(Type.SET_TASKS, { tasks })
export const Store = (key, value) => Action(Type.STORE, { key, value })
