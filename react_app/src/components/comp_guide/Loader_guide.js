import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoaderGuide = () => {
	return (
		<Spinner
			animation='border'
			role='status'
			style={{
				width: '100px',
				height: '100px',
				margin: 'auto',
				display: 'block',
			}}>
			<span>Loading...</span>
		</Spinner>
	)
}
export default LoaderGuide