import { Type } from 'azure-learn-webapp/actions'


export default (tasks = [], { type, ...payload }) => {
	switch (type) {

		case Type.SET_TASKS:
			return payload.tasks

		default:
			return tasks
	}
}
