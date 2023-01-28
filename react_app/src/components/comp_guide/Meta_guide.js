import React from 'react'
import { Helmet } from 'react-helmet'

const MetaGuide = ({ title, description, keywords, author }) => {
	return (
		<>
			<Helmet>
				<title>{title}</title>
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
				<meta name='author' content={author} />
			</Helmet>
		</>
	)
}

MetaGuide.defaultProps = {
	title: 'Proyect_07_React | Home',
	description: 'test project start',
	keywords: 'project',
	author: 'Franco Acuña',
}
export default MetaGuide