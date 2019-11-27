import { Router } from 'express'

import {
	createTask,
	getUserTasks,
} from 'azure-learn-serverapp/api/tasks'
import { requireUser } from 'azure-learn-serverapp/lib/roles'


export default () => Router()
	.get('/', requireUser, getUserTasks)
	.post('/', requireUser, createTask)
