import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Modal from 'react-bootstrap/Modal'

const Todo = () => {
	return (
		<div className='container'>
			<Jumbotron>
				<h1>Todo</h1>
				<p>Accomplish tasks.</p>
			</Jumbotron>
			<Form>
				<Form.Group controlId='task'>
					<Form.Label>Task</Form.Label>
					<Form.Control type='text'></Form.Control>
				</Form.Group>
			</Form>
		</div>
	)
}

export default Todo
