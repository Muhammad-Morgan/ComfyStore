import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQ } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../Utilities/Context'
const Login = () => {
  const navigate = useNavigate()
  const { showAlert } = useGlobalContext()
  const [signInDetails, setSignInDetails] = useState({
    email: '',
    password: ''
  })
  axios.defaults.withCredentials = true
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setSignInDetails({
      ...signInDetails,
      [name]: value
    })
  }
  const handleClick = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/login', { ...signInDetails }).then(({ data }) => {
      const { msg, type } = data
      if (type === 'success') {
        showAlert({ msg, type })
        setSignInDetails({
          ...signInDetails,
          email: '',
          password: ''
        })
        navigate('/')
      } else {
        setSignInDetails({
          ...signInDetails,
          email: '',
          password: ''
        })
        showAlert({ msg, type })
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className='container'>
      <div className='row row-cols-1 row-cols-md-2'>
        <div className='col d-none d-md-block'>
          <h1 className='fs-1 mb-5'>Your One Stop Shop</h1>
          <p className='fs-4 mb-4'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?
          </p>
          <p
            style={{ color: 'var(--primary-color-2)' }}
            className='fs-5 mb-2'>Create an account to check our latest products !</p>
        </div>
        <div className='col d-flex justify-content align-items-center'>
          <div className="card" style={{
            height: '100%',
            width: '75%', minWidth: '350px', marginInline: 'auto', border: 'none', boxShadow: '0px 2px 1px rgba(0, 0, 0, .2)', borderRadius: '5px', borderTopColor: 'var(--primary-color)', borderTopWidth: '5px', borderTopStyle: 'solid',
            backgroundColor: 'var(--primary-color-3)',
            borderBottomColor: 'var(--primary-color)', borderBottomWidth: '5px',
            borderBlockStyle: 'solid'
          }}>
            <form
              className="card-body py-2 px-4">
              <h2 className="text-center fs-2">Sign In</h2>
              <div className="email mb-4">
                <label htmlFor="email" className="form-label fs-5">Email</label>
                <input
                  value={signInDetails.email}
                  onChange={handleChange}
                  name="email"
                  type="text"
                  id="email"
                  className="form-control" />
              </div>
              <div className="password mb-4">
                <label htmlFor="password" className="form-label fs-5">Password</label>
                <input
                  value={signInDetails.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  id="password"
                  className="form-control" />
              </div>
              <div className="d-grid gap-2">
                <button
                  onClick={handleClick}
                  className="btn-cstm1 mt-4">Login</button>
              </div>
              <p className="mt-4 text-center">Not a member? <Link
                style={{ textDecoration: 'none' }}
                to="/register">Register</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login