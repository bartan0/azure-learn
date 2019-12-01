import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { LoadTasks } from 'azure-learn-webapp/actions'


export default connect(
	({ tasks }) => ({ tasks }),
	dispatch => ({
		loadTasks: () => dispatch(LoadTasks()),
	})
)(({
	tasks,

	loadTasks,
}) => {
	useEffect(() => {
		loadTasks()
	}, [])

	return (
		<div>
			<h2>Tasks</h2>

			<ul>
				{tasks.map(({ id, content }) =>
					<li key={id}>{content}</li>
				)}
			</ul>
		</div>
	)
})
