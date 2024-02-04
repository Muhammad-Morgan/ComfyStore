import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from 'react-router-dom'
import { useGlobalContext } from '../Utilities/Context'
const Nav = () => {
  const { showSideBar, showAlert, updateUser, userInfo, updateInfo } = useGlobalContext()
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogOut = () => {
    axios.get('http://localhost:5000/logout').then(({ data }) => {
      const { msg, type } = data
      if (type === 'success') {
        updateUser()
        updateInfo({
          name: '',
          id: ''
        })
        showAlert({ msg, type })
        navigate('/login')
      }
    }).catch(err => console.log(err))
  }

  return (
    <nav className="navbar bg-body-tertiary mb-3 mb-sm-4">
      <div className="container-fluid d-flex align-items-center">
        <Link
          className="navbar-brand" to="/">
          <img
            className='logo'
            src='https://react-course-comfy-sloth-store.netlify.app/static/media/logo.221f6b13e6eaaad5828372464f73a1a4.svg' />
        </Link>
        <div className='d-none d-lg-block'>
          <ul className="nav nav-underline justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              {userInfo?.name !== '' ? <Link to='/products' className='nav-link'>
                Products
              </Link> : <Link className='nav-link'>Contact</Link>}
            </li>
          </ul>
        </div>
        <div className='d-none d-lg-block'>
          <ul className="nav nav-underline justify-content-center">
            <li className="nav-item">
              {userInfo?.name !== '' ? <Link to='/cart' className='nav-link'>
                <FontAwesomeIcon icon={faCartShopping} className='fa-xl ma-cart' />
              </Link> : <Link className="log-btn" to='/login'>Login</Link>}

            </li>{userInfo?.name !== '' && <button
              onClick={handleLogOut}
              className="log-out">
              Logout
            </button>
            }
          </ul>
        </div>
        <div className='d-block d-lg-none'>
          <button onClick={showSideBar} className='toggle-btn'>
            <FontAwesomeIcon className='fa-2xl' icon={faBars} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav