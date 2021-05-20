import React from 'react'
import { useState, useEffect } from 'react'
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import { RiSettings4Line } from 'react-icons/ri'

const Item = ({ id, title, done, handleDone, deleteItem, editItem }) => {
	const [isShowDropdown, setIsShowDropdown] = useState(false)
	return (
		<li
			key={id}
			className={`list-group-item ${done && 'list-group-item-success'}`}>
			<div className='row align-items-center'>
				<div className='col-1 align-content-center'>
					<div className='form-check px-0'>
						<div>
							<input
								type='checkbox'
								className='btn-check'
								id={id}
								autoComplete='off'
								checked={done}
								readOnly
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
				<div className='col-10'>
					<h4>{title}</h4>
				</div>
				<div className='col-1'>
					<div className='dropend'>
						<button
							className='btn dropdown-toggle'
							type='button'
							id={id}
							data-bs-toggle='dropdown'
							aria-expanded='false'
							onClick={() => setIsShowDropdown(!isShowDropdown)}>
							<RiSettings4Line size={30} />
						</button>
						<ul
							className={`dropdown-menu ms-4 ${isShowDropdown && 'show'}`}
							aria-labelledby={id}>
							<li>
								<button
									className='dropdown-item'
									type='button'
									onClick={() => {
										setIsShowDropdown(false)
										editItem(id)
									}}>
									Edit
								</button>
							</li>
							<li>
								<button
									className='dropdown-item'
									type='button'
									onClick={() => {
										setIsShowDropdown(false)
										deleteItem(id)
									}}>
									Delete
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</li>
	)
}

export default Item
