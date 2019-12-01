import { Type } from 'azure-learn-webapp/actions'


export default (tasks = [], { type, ...payload }) => {
	switch (type) {

		case Type.TASKS_SET:
			return payload.tasks

		default:
			return tasks
	}
}
