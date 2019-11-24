import React from 'react'
import ReactDOM from 'react-dom'

import { createAppRoot } from './dom'
import UI from './ui'


export default async () => {
	const root = await createAppRoot()
	const ui =
		<UI/>

	ReactDOM.render(ui, root)
}
