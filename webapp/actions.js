const Action = (type, payload) => ({ type, payload })


export const Login = model => Action('LOGIN', model)
