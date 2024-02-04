import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
const Loading = () => {
  return (
    <div className='d-flex justify-content-center align-items-center'
    style={{
        padding: '6rem',
        paddingBottom: '20rem'
    }}
    >
        <h1 
        style={{
            color: 'var(--primary-color-2)',
            fontSize: '3rem'
        }}>
            <FontAwesomeIcon className='fa-2xl' icon={faCircleNotch} spin />
        </h1>
    </div>
  )
}

export default Loading