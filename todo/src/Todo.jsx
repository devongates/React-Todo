import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { FaTrash, FaEdit } from 'react-icons/fa'

const Todo = () => {
	const [tasks, setTasks] = useState([])
	const [task, setTask] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [editId, setEditId] = useState(null)
	useEffect(() => {
		if (tasks) {
			setIsEditing(false)
		}
	}, [tasks])
	const handleSubmit = (e) => {
		e.preventDefault()
		if (!task) {
			alert('Please enter value')
			return
		}
		const newTask = {
			id: new Date().getTime().toString(),
			todo: task,
		}
		setTasks([...tasks, newTask])
		setTask('')
	}
	const deleteItem = (id) => {
		const newTasks = tasks.filter((task) => task.id !== id)
		setTasks(newTasks)
	}
	const editItem = (id) => {
		setIsEditing(true)
		setEditId(id)
		const editingItem = tasks.find((task) => task.id === id)
		setTask(editingItem.todo)
	}
	const handleEdit = (e) => {
		e.preventDefault()
		if (!task) {
			alert('Please enter value')
			return
		}
		const newTasks = tasks.map((editedTask) => {
			if (editedTask.id === editId) {
				editedTask.todo = task
				setTask('')
			}
			return editedTask
		})
		setTasks(newTasks)
	}
	return (
		<Container className='container'>
			<Jumbotron>
				<h1>Todo</h1>
				<p>Accomplish tasks.</p>
			</Jumbotron>
			<Form>
				<Form.Row className='align-items-center'>
					<Col>
						<Form.Control
							type='text'
							placeholder='Enter a task'
							value={task}
							onChange={(e) => setTask(e.target.value)}></Form.Control>
					</Col>
					<Col>
						{isEditing ? (
							<Button
								variant='success'
								type='submit'
								onClick={(e) => handleEdit(e)}>
								Edit
							</Button>
						) : (
							<Button type='submit' onClick={(e) => handleSubmit(e)}>
								Submit
							</Button>
						)}
					</Col>
				</Form.Row>
			</Form>
			<ListGroup>
				{tasks.map((task) => {
					const { id, todo } = task
					return (
						<ListGroup.Item key={id}>
							<Row className='align-items-center'>
								<Col sm={10}>
									<h4>{todo}</h4>
								</Col>
								<Col sm={2}>
									<ButtonGroup>
										<Button
											variant='danger'
											size='lg'
											onClick={() => deleteItem(id)}>
											<FaTrash></FaTrash>
										</Button>

										<Button
											variant='success'
											size='lg'
											onClick={() => editItem(id)}>
											<FaEdit></FaEdit>
										</Button>
									</ButtonGroup>
								</Col>
							</Row>
						</ListGroup.Item>
					)
				})}
			</ListGroup>
		</Container>
	)
}

export default Todo
