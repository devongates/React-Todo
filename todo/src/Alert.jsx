import React from 'react'
import { useEffect } from 'react'

const Alert = ({ clearAlert, show, msg, type, tasks }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			clearAlert()
		}, 3000)
		return () => {
			clearTimeout(timeout)
		}
	}, [tasks, show, clearAlert])
	return (
		<div className={`alert alert-${type} ${show ? 'show' : 'fade'}`}>{msg}</div>
	)
}

export default Alert
