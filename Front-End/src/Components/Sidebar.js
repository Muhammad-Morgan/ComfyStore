import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import '../Styles/sidebar.css'
import { useGlobalContext } from '../Utilities/Context'
const Sidebar = () => {
    const { sideBar, closeSideBar } = useGlobalContext()
    return (
        <div className={`d-block side-bar d-md-none ${sideBar ? 'show-side' : 'hide-side'}`}>
            <nav className="navbar bg-body-tertiary mb-3 mb-md-4">
                <div className="container-fluid d-flex align-items-center">
                    <Link
                        className="navbar-brand" to="/">
                        <img
                            className='logo'
                            src='https://react-course-comfy-sloth-store.netlify.app/static/media/logo.221f6b13e6eaaad5828372464f73a1a4.svg' />
                    </Link>
                    <div className='d-block d-md-none'>
                        <button className='toggle-btn'
                            onClick={closeSideBar}
                        >
                            <FontAwesomeIcon
                                style={{ color: 'var(--declined)' }}
                                className='fa-xl' icon={faX} />
                        </button>
                    </div>
                </div>
                <ul className='container-fluid px-0 d-flex flex-column sidebar-links'>
                    <Link className='sidebar-link'>Link</Link>
                    <Link className='sidebar-link'>Link</Link>
                    <Link className='sidebar-link'>Link</Link>
                </ul>
            </nav>

        </div>
    )
}

export default Sidebar