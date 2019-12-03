const Action = (type, payload) => ({ type, ...payload })


export const Type = {
	INITIALIZE: 'ACTION::INITIALIZE',
	LOGIN: 'ACTION::LOGIN',
	NAVIGATE: 'ACTION::NAVIGATE',
	REGISTER: 'ACTION::REGISTER',
	SET_ME: 'ACTION::SET_ME',
	STORE: 'ACTION::STORE',
	TASKS_LOAD: 'ACTION::TASKS_LOAD',
	TASKS_SET: 'ACTION::TASKS_SET',
	TASK_CREATE: 'ACTION::TASK_CREATE',
	USERS_LOAD: 'ACTION::USERS_LOAD',
	USERS_SET: 'ACTION::USERS_SET',
}

export const Initialize = () => Action(Type.INITIALIZE)
export const Login = model => Action(Type.LOGIN, model)
export const Navigate = uri => Action(Type.NAVIGATE, { uri })
export const Register = model => Action(Type.REGISTER, model)
export const SetMe = me => Action(Type.SET_ME, me)
export const Store = (key, value) => Action(Type.STORE, { key, value })

export const CreateTask = model => Action(Type.TASK_CREATE, model)
export const LoadTasks = () => Action(Type.TASKS_LOAD)
export const SetTasks = tasks => Action(Type.TASKS_SET, { tasks })

export const LoadUsers = () => Action(Type.USERS_LOAD)
export const SetUsers = users => Action(Type.USERS_SET, { users })
