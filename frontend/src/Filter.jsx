import React from 'react'

const Filter = ({ display, setFilter, handleFilter }) => {
	return (
		<div className='btn-group mb-3' role='group'>
			<input
				type='radio'
				className='btn-check'
				name='btnradio'
				id='btnradio1'
				autoComplete='off'
				checked={display === 'all'}
				readOnly
			/>
			<label
				className='btn btn-outline-primary'
				htmlFor='btnradio1'
				onClick={() => {
					setFilter('all')
					handleFilter()
				}}>
				All
			</label>

			<input
				type='radio'
				className='btn-check'
				name='btnradio'
				id='btnradio2'
				autoComplete='off'
				checked={display === 'complete'}
				readOnly
			/>
			<label
				className='btn btn-outline-primary'
				htmlFor='btnradio2'
				onClick={() => {
					setFilter('complete')
					handleFilter()
				}}>
				Complete
			</label>

			<input
				type='radio'
				className='btn-check'
				name='btnradio'
				id='btnradio3'
				autoComplete='off'
				checked={display === 'incomplete'}
				readOnly
			/>
			<label
				className='btn btn-outline-primary'
				htmlFor='btnradio3'
				onClick={() => {
					setFilter('incomplete')
					handleFilter()
				}}>
				Incomplete
			</label>
		</div>
	)
}

export default Filter
