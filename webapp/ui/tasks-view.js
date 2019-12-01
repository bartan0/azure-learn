import React from 'react'
import { connect } from 'react-redux'


export default connect(
	({ tasks }) => ({ tasks })
)(({
	tasks
}) =>
	<div>
		<h2>TASKS VIEW</h2>

		<ul>
			{tasks.map(({ id, content }) =>
				<li key={id}>{content}</li>
			)}
		</ul>
	</div>
)
