import React from 'react'
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa'

const Item = ({ id, todo, done, handleDone, deleteItem, editItem }) => {
	return (
		<li
			key={id}
			className={`list-group-item ${done && 'list-group-item-success'}`}>
			<div className='row align-items-center'>
				<div className='col-2 align-content-center'>
					<div className='form-check'>
						<div>
							<input
								type='checkbox'
								className='btn-check'
								id={id}
								autoComplete='off'
							/>
							<label
								className='btn btn-outline-success'
								htmlFor={id}
								onClick={() => {
									console.log(id)
									handleDone(id)
								}}>
								<FaCheck />
							</label>
						</div>
					</div>
				</div>
				<div className='col-8'>
					<h4>{todo}</h4>
				</div>
				<div className='col-2'>
					<div className='btn-group d-flex justify-content-end'>
						<button
							className='btn btn-danger py-3'
							onClick={() => {
								console.log(id)
								deleteItem(id)
							}}>
							<FaTrash />
						</button>
						<button
							className='btn btn-success py-3'
							onClick={() => editItem(id)}>
							<FaEdit />
						</button>
					</div>
				</div>
			</div>
		</li>
	)
}

export default Item
