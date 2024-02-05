import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useGlobalContext } from '../Utilities/Context'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const HorizontalNav = () => {
    const navigate = useNavigate()
    const { userInfo, updateInfo } = useGlobalContext()

    useEffect(() => {
        var localToken = localStorage.getItem('localToken') || ''
        axios.get(`https://server-store-beta.vercel.app/auth?localToken=${localToken}`).then(({ data }) => {
            const { myToken, state } = data
            if (state !== 'success') {
                navigate('/login')
            }
            else {
                const myData = jwtDecode(myToken)
                const { name, myID } = myData
                updateInfo({ name, id: myID })
            }
        }).catch(err => console.log(err))
    }, [userInfo.name])
    return (
        <nav
            style={{
                backgroundColor: 'var(--primary-color-3)',
                marginBottom: '3rem',
                width: '100%'
            }}
            aria-label="breadcrumb">
            <div style={{width: '100%'}} className="d-flex justify-content-between align-items-center">
                <ol style={{width: '100%'}} className="breadcrumb py-3 px-4">
                    <Link to='/' style={{ textDecoration: 'none' }} className="breadcrumb-item fs-5 nav-link  fw-normal">Home</Link>
                    <Link to='/products' style={{ textDecoration: 'none' }} className="breadcrumb-item nav-link  fw-normal fs-5 active" aria-current="page">Products</Link>
                </ol>
                <p style={{letterSpacing: '1.5px'}} className='fs-4 text-capitalize text-end pe-4'>Hi, <span className='mb-0 text-success-emphasis'>{userInfo.name}</span></p>
            </div>
        </nav>
    )
}

export default HorizontalNav
