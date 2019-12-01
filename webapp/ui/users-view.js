import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { LoadUsers } from 'azure-learn-webapp/actions'


export default connect(
	({ users }) => ({ users }),
	dispatch => ({
		loadUsers: () => dispatch(LoadUsers())
	})
)(({
	users,
	loadUsers,
}) => {
	useEffect(() => {
		loadUsers()
	}, [])

	return (
		<div>
			<h2>Users list</h2>

			<table>
				<thead>
					<tr>
						<td>Admin</td>
						<td>Username</td>
					</tr>
				</thead>

				<tbody>
					{users.map(({ id, username, roles }) =>
						<tr key={id}>
							<td>{roles.includes('admin') ? '+' : ''}</td>
							<td>{username}</td>
						</tr>
					)}
				</tbody>

				<tfoot>
					<tr>
						<td>Total</td>
						<td>{users.length}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	)
})
