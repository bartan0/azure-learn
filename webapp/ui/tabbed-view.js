import React, { useState } from 'react'


export default ({
	tabs,
}) => {
	const [ tab, setTab ] = useState(tabs[0].key)

	return (
		<div>
			<ul>
				{tabs.map(({ key, label }) =>
					<li
						key={key}
						onClick={() => setTab(key)}
					>
						{label}
					</li>
				)}
			</ul>

			{tabs.find(({ key }) => key === tab).content}
		</div>
	)
}
