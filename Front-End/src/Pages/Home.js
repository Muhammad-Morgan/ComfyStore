import React, { useState, useEffect } from 'react'
import HorizontalNav from '../Components/HorizontalNav'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../Utilities/Context'
const Home = () => {
  const { userInfo, updateInfo } = useGlobalContext()
  const [condition, setCondition] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:5000/auth').then(({ data }) => {
      const { state, myToken } = data
      if (state === 'success') {
        setCondition(true)
      }
      else {
        setCondition(false)
      }
    }).catch(err => console.log(err))
  }, [userInfo.name])
  return (
    <div className='container-fluid'>
      {condition && <HorizontalNav />}
      <section className='row row-cols-1 row-cols-md-2 align-items-center'>
        <div className='col'>
          <img style={{ width: '100%', height: '450px' }} className='img-fluid rounded' src='https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg' />
        </div>
        <div className='col'>
          <h2 className='fs-3 mb-4'>Welcome to our Comfy Store !</h2>
          <p className='fs-4 mb-4'>Here is your One-Stop Shop, where you can find all your needs from furniture and upholestry items...</p>
          <p className='fs-5 text-danger-emphasis'>If you still didn't create an account, go a head, and stay assured that your data is secured, and no bank/card details are stored</p>
          <p>Check our free shipping products !</p>
        </div>
      </section>
    </div>
  )
}

export default Home