export const createAppRoot = async () => new Promise(resolve =>
	window.addEventListener('load', () => {
		const root = document.body.appendChild(document.createElement('div'))

		resolve(root)
	})
)
