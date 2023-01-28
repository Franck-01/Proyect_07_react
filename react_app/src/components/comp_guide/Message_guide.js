import React from "react"
import {Alert} from 'react-bootstrap'

const MessageGuide = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>
}
MessageGuide.defaultProps = {
	variant: 'info',
}

export default MessageGuide