import React from 'react'
import { useState, useEffect } from 'react'
import Alert from './Alert'
import Item from './Item'
import Filter from './Filter'

const Todo = () => {
	const [tasks, setTasks] = useState([])
	const [task, setTask] = useState('')
	const [filteredTasks, setFilteredTasks] = useState([])
	const [isEditing, setIsEditing] = useState(false)
	const [editId, setEditId] = useState(null)
	const [alert, setAlert] = useState({
		show: false,
		msg: '',
		type: '',
	})
	const [filter, setFilter] = useState('all')

	useEffect(() => {
		if (tasks) {
			setIsEditing(false)
		}
		setFilteredTasks(tasks)
	}, [tasks])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!task) {
			handleAlert(true, 'Please enter value', 'danger')
			return
		}
		const newTask = {
			id: new Date().getTime().toString(),
			todo: task,
			done: false,
		}
		setTasks([...tasks, newTask])
		handleAlert(true, 'Item added', 'success')
		setTask('')
	}

	const deleteItem = (id) => {
		const newTasks = tasks.filter((task) => task.id !== id)
		setTasks(newTasks)
		handleAlert(true, 'Item deleted', 'warning')
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
			handleAlert(true, 'Please enter value', 'danger')
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
		handleAlert(true, 'Item edited', 'primary')
	}

	const handleAlert = (show = false, msg = '', type = '') => {
		setAlert({ show, msg, type })
	}

	const handleDone = (id) => {
		const newTasks = tasks.map((task) => {
			if (task.id === id) {
				task.done = !task.done
			}
			return task
		})
		setTasks(newTasks)
	}

	const handleFilter = (filterBy) => {
		setFilter(filterBy)
		if (filterBy === 'all') {
			setFilteredTasks(tasks)
			return
		}
		if (filterBy === 'complete') {
			const newTasks = tasks.filter((task) => {
				return task.done === true
			})
			console.log('filtering to completed tasks')
			setFilteredTasks(newTasks)
		}
		if (filterBy === 'incomplete') {
			const newTasks = tasks.filter((task) => {
				return task.done === false
			})
			setFilteredTasks(newTasks)
		}
	}

	return (
		<div className='container'>
			<div className='container bg-light p-5 rounded-lg m-3'>
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
			<Alert clearAlert={handleAlert} {...alert} tasks={tasks}></Alert>
			<Filter display={filter} handleFilter={handleFilter} />
			<ul className='list-group mb-3'>
				{filteredTasks.map((task) => {
					return (
						<Item
							key={task.id}
							{...task}
							editItem={editItem}
							deleteItem={deleteItem}
							handleDone={handleDone}
						/>
					)
				})}
			</ul>
		</div>
	)
}

export default Todo
