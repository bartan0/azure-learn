import React, { useState } from 'react'

import TabbedView from './tabbed-view'
import TasksView from './tasks-view'
import UsersView from './users-view'


export default () =>
	<TabbedView tabs={[
		{
			key: 'TASKS',
			label: 'Tasks',
			content:
				<TasksView/>
		}, {
			key: 'USERS',
			label: 'Users',
			content:
				<UsersView/>
		}
	]}/>
