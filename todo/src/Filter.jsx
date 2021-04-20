import React from 'react'

const Filter = ({ display, handleFilter }) => {
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
				onClick={() => handleFilter('all')}>
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
				onClick={() => handleFilter('complete')}>
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
				onClick={() => handleFilter('incomplete')}>
				Incomplete
			</label>
		</div>
	)
}

export default Filter
