import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import {
	CreateTask,
	LoadTasks
} from 'azure-learn-webapp/actions'
import T from 'azure-learn-webapp/messages'


const validate = ({
	content,
}) => {
	const errors = []

	if (!content.value.trim()) {
		errors.push([ 'content', 'CREATE_TASK_CONTENT_REQUIRED' ])
	}

	return [ errors, {
		content: content.value,
	} ]
}


export default connect(
	({ tasks }) => ({ tasks }),
	{
		onCreateTask: CreateTask,
		onLoadTasks: LoadTasks,
	}
)(({
	tasks,

	onCreateTask,
	onLoadTasks,
}) => {
	const [ errors, setErrors ] = useState([])
	const submit = event => {
		event.preventDefault()

		const [ errors, model ] = validate(event.target.elements)

		setErrors(errors)

		if (!errors.length) {
			onCreateTask(model)
			event.target.reset()
		}
	}

	useEffect(() => {
		onLoadTasks()
	}, [])

	return (
		<div>
			<h2>Tasks</h2>

			<form
				onSubmit={submit}
			>
				<div>
					<label>
						<input type="text" name="content"/>
						{errors
							.filter(([ name ]) => name === 'content')
							.map(([ _, msgKey ]) =>
								<div key={msgKey}>{T(msgKey)}</div>
							)
						}
					</label>

					<button>Add</button>
				</div>
			</form>

			<ul>
				{tasks.map(({ id, content }) =>
					<li key={id}>{content}</li>
				)}
			</ul>
		</div>
	)
})
