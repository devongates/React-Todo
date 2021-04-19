import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import Alert from './Alert'

const Todo = () => {
	const [tasks, setTasks] = useState([])
	const [task, setTask] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [editId, setEditId] = useState(null)
	const [isAlert, setIsAlert] = useState(false)

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
		<div className='container'>
			<div className='container bg-light p-5 rounded-lg m-3'>
				<h1>Todo</h1>
				<p>Accomplish tasks.</p>
			</div>
			<form className='m-2'>
				<div className='row mb-3'>
					<div className='col-10'>
						<input
							className='form-control'
							type='text'
							placeholder='Enter a task'
							value={task}
							onChange={(e) => setTask(e.target.value)}></input>
					</div>
					<div className='col-2'>
						{isEditing ? (
							<button
								className='btn btn-success'
								type='submit'
								onClick={(e) => handleEdit(e)}>
								Edit
							</button>
						) : (
							<button
								className='btn btn-primary'
								type='submit'
								onClick={(e) => handleSubmit(e)}>
								Submit
							</button>
						)}
					</div>
				</div>
			</form>
			<Alert isAlert={isAlert}></Alert>
			<ul className='list-group'>
				{tasks.map((task) => {
					const { id, todo } = task
					return (
						<li className='list-group-item' key={id}>
							<div className='row align-items-center'>
								<div className='col-10'>
									<h4>{todo}</h4>
								</div>
								<div className='col-2'>
									<div className='btn-group'>
										<button
											className='btn btn-danger btn-lg'
											onClick={() => deleteItem(id)}>
											<FaTrash></FaTrash>
										</button>
										<button
											className='btn btn-success btn-lg'
											onClick={() => editItem(id)}>
											<FaEdit></FaEdit>
										</button>
									</div>
								</div>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Todo
