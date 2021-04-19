import React from 'react'
import { useEffect } from 'react'

const Alert = ({ clearAlert, show, msg, type }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			clearAlert()
		}, 3000)
		return () => {
			clearTimeout(timeout)
		}
	}, [show])
	return (
		<div className={`alert alert-${type} fade ${show && 'show'}`}>{msg}</div>
	)
}

export default Alert
