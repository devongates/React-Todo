import React from 'react'

const Alert = ({ isAlert }) => {
	return (
		<div className={`alert alert-danger fade show=${isAlert}`}>
			Please enter value
		</div>
	)
}

export default Alert
