const Action = (type, payload) => ({ type, ...payload })


export const Type = {
	INITIALIZE: 'ACTION::INITIALIZE',
	LOGIN: 'ACTION::LOGIN',
	NAVIGATE: 'ACTION::NAVIGATE',
	REGISTER: 'ACTION::REGISTER',
	SET_ME: 'ACTION::SET_ME',
	TASKS_SET: 'ACTION::TASKS_SET',
	TASKS_LOAD: 'ACTION::TASKS_LOAD',
	STORE: 'ACTION::STORE',
}

export const Initialize = () => Action(Type.INITIALIZE)
export const Login = model => Action(Type.LOGIN, model)
export const Navigate = uri => Action(Type.NAVIGATE, { uri })
export const Register = model => Action(Type.REGISTER, model)
export const SetMe = me => Action(Type.SET_ME, me)
export const Store = (key, value) => Action(Type.STORE, { key, value })

export const SetTasks = tasks => Action(Type.TASKS_SET, { tasks })
export const LoadTasks = () => Action(Type.TASKS_LOAD)
