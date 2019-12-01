export const getRoles = roles => ({
	admin: roles.includes('admin'),
	anonymous: false,
	user: roles.some(role => [ 'user', 'admin' ].includes(role)),
})
