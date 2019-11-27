import { Router } from 'express'

import { getUsers } from 'azure-learn-serverapp/api/users'
import { requireAdmin } from 'azure-learn-serverapp/lib/roles'


export default () => Router()
	.get('/', requireAdmin, getUsers)
