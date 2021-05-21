import React from 'react'
import { useState, useEffect } from 'react'
import Alert from './Alert'
import Item from './Item'
import Filter from './Filter'

const Todo = () => {
	const [tasks, setTasks] = useState([])
	const [title, setTitle] = useState('')
	const [filteredTasks, setFilteredTasks] = useState([])
	const [isEditing, setIsEditing] = useState(false)
	const [editId, setEditId] = useState(null)
	const [alert, setAlert] = useState({
		show: false,
		msg: '',
		type: '',
	})
	const [filter, setFilter] = useState('all')

	// Filters tasks into 'all', 'complete', or 'incomplete'
	const handleFilter = () => {
		if (filter === 'all') {
			setFilteredTasks(tasks)
			return
		}
		if (filter === 'complete') {
			const newTasks = tasks.filter((task) => {
				return task.done === true
			})
			setFilteredTasks(newTasks)
			return
		}
		if (filter === 'incomplete') {
			const newTasks = tasks.filter((task) => {
				return task.done === false
			})
			setFilteredTasks(newTasks)
			return
		}
	}

	useEffect(() => {
		handleFilter()
	})

	// Handles when the submit button is clicked
	const handleSubmit = (e) => {
		e.preventDefault()
		if (!title) {
			handleAlert(true, 'Please enter value', 'danger')
			return
		}
		const newTask = {
			id: new Date().getTime().toString(),
			title: title,
			done: false,
			highPriority: false,
		}
		setTasks([...tasks, newTask])
		handleAlert(true, 'Item added', 'success')
		setTitle('')
	}

	// Handles when the delete button is clicked
	const deleteItem = (id) => {
		const newTasks = tasks.filter((task) => task.id !== id)
		setTasks(newTasks)
		handleAlert(true, 'Item deleted', 'warning')
		if (id === editId) {
			setIsEditing(false)
		}
	}

	// Handles when the edit button is clicked
	const editItem = (id) => {
		setIsEditing(true)
		setEditId(id)
		const editingItem = tasks.find((task) => task.id === id)
		setTitle(editingItem.title)
	}

	// Handles when the edit button is clicked
	const handleEdit = (e) => {
		e.preventDefault()
		if (!title) {
			handleAlert(true, 'Please enter value', 'danger')
			return
		}
		const newTasks = tasks.map((editedTask) => {
			if (editedTask.id === editId) {
				editedTask.title = title
				setTitle('')
				setIsEditing(false)
			}
			return editedTask
		})
		setTasks(newTasks)
		handleAlert(true, 'Item edited', 'primary')
	}

	// Handles how alerts are displayed
	const handleAlert = (show = false, msg = '', type = '') => {
		setAlert({ show, msg, type })
	}

	// Updates the 'done' status of a checked task
	const handleDone = (id) => {
		const newTasks = tasks.map((task) => {
			if (task.id === id) {
				task.done = !task.done
			}
			return task
		})
		setTasks(newTasks)
	}

	// Updates task priority
	const handlePriority = (id) => {
		const newTasks = tasks.map((task) => {
			if (task.id === id) {
				task.highPriority = !task.highPriority
			}
			return task
		})
		setTasks(newTasks)
	}

	// Checks if any tasks have high priority
	const checkPriority = () => {
		if (tasks.filter((task) => task.highPriority).length > 0) {
			return true
		}
		return false
		// setIsShowPriority(highPriorityTasks)
	}

	return (
		<div className='container d-flex justify-content-center'>
			<div className='w-75'>
				<div className='container bg-light p-5 rounded-lg my-3'>
					<h1>Todo</h1>
					<p>
						{tasks.length === 0
							? 'Add some tasks to get started'
							: tasks.length === 1
							? 'One task to go'
							: `${tasks.length} tasks to go`}
					</p>
				</div>
				<form className='m-2'>
					<div className='row mb-1'>
						<div className='col-11'>
							<input
								className='form-control'
								type='text'
								placeholder='Enter a task'
								value={title}
								onChange={(e) => setTitle(e.target.value)}></input>
						</div>
						<div className='col-1 d-flex justify-content-center'>
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
				<Alert clearAlert={handleAlert} {...alert} tasks={tasks}></Alert>
				<Filter
					display={filter}
					setFilter={setFilter}
					handleFilter={handleFilter}
				/>
				{checkPriority() && (
					<>
						<h4 className='text-center mb-4'>High Priority</h4>
						<hr />
					</>
				)}
				<ul className='list-group mb-4'>
					{filteredTasks.map((task) => {
						return (
							task.highPriority && (
								<Item
									key={task.id}
									{...task}
									editItem={editItem}
									deleteItem={deleteItem}
									handleDone={handleDone}
									handlePriority={handlePriority}
									checkPriority={checkPriority}
								/>
							)
						)
					})}
				</ul>
				{checkPriority() && (
					<>
						<h4 className='text-center mb-4'>Low Priority</h4>
						<hr />
					</>
				)}
				<ul className='list-group mb-4'>
					{filteredTasks.map((task) => {
						return (
							!task.highPriority && (
								<Item
									key={task.id}
									{...task}
									editItem={editItem}
									deleteItem={deleteItem}
									handleDone={handleDone}
									handlePriority={handlePriority}
									checkPriority={checkPriority}
								/>
							)
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default Todo
