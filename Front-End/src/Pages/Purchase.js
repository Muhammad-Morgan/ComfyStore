import React, { useState, useEffect } from 'react'
import HorizontalNav from '../Components/HorizontalNav'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../Utilities/Context'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
const Purchase = () => {
    const navigate = useNavigate()
    const { showAlert, loading, startLoading, endLoading, userInfo, updateInfo } = useGlobalContext()
    const [card, setCard] = useState(false)
    const [cash, setCash] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (cash === true && card === true) {
            showAlert({
                msg: 'choose one payment method',
                type: 'info'
            })
        }
        if (card === false && cash === false) {
            showAlert({
                msg: 'choose a payment method',
                type: 'info'
            })
        }
        if(cash === true && card === false) {
            axios.delete(`http://localhost:5000/clearcart?myID=${userInfo.id}`).then(() => {
                showAlert({
                    msg: 'Cash payment is successfull !',
                    type: 'success'
                })
                navigate('/')
            }).catch(err => console.log(err))
        }
        if(card === true && cash === false) {
            axios.delete(`http://localhost:5000/clearcart?myID=${userInfo.id}`).then(() => {
                showAlert({
                    msg: 'Card payment is successfull !',
                    type: 'success'
                })
                navigate('/')
            }).catch(err => console.log(err))
        }
    }
    useEffect(() => {
        axios.get('http://localhost:5000/auth').then(({ data }) => {
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
        <div className='container-fluid'>
            <HorizontalNav />
            <div className='row row-cols-1 row-cols-md-2 align-items-center'>
                <section className='col'>
                    <h2 className='mb-4'>Almost done</h2>
                    <p className='fs-4 text-light-emphasis'>Choose your payment method</p>
                    <p className='fs-5 text-dark-emphasis'>We accept either card or cash payments </p>
                    <p>Your card information are securly encrypted, and never saved in our data base</p>
                </section>
                <section className='col'>
                    <nav
                        style={{
                            backgroundColor: 'var(--pending-2)',
                            marginBottom: '3rem',
                        }}
                        aria-label="breadcrumb">
                        <p className='fs-5 text-center text-dark'>Choose only 1 method</p>
                    </nav>
                    <div
                        style={{ width: '85%', marginInline: 'auto' }}
                        className='d-flex gap-5 justify-content-between'>
                        <div>
                            <input
                                style={{ width: '100%' }}
                                type="checkbox"
                                className="btn-check"
                                id="card"
                                name="card"
                                value={card}
                                onChange={() => {
                                    setCard(!card)
                                    console.log(card)
                                }}
                                autocomplete="off" />
                            <label
                                className="btn d-flex" htmlFor="card">
                                <p className='fs-5 mb-0'><FontAwesomeIcon icon={faCreditCard} /></p>
                                <p className='fs-5 mb-0 ms-3 text-nowrap'>Card payment</p>
                            </label>
                        </div>
                        <div>
                            <input
                                style={{ width: '100%' }}
                                type="checkbox"
                                className="btn-check"
                                id="cash"
                                name="cash"
                                value={cash}
                                onChange={() => {
                                    setCash(!cash)
                                    console.log(cash)
                                }}
                                autocomplete="off" />
                            <label
                                className="btn d-flex" htmlFor="cash">
                                <p className='fs-5 mb-0'><FontAwesomeIcon icon={faMoneyBill1Wave} /></p>
                                <p className='fs-5 mb-0 ms-3 text-nowrap'>Cash payment</p>
                            </label>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mt-5'>
                        <button
                            style={{ width: '45%' }}
                            onClick={handleSubmit}
                            className='submit-bt'>Purchase !</button>
                        <Link to='/cart'
                            style={{ width: '40%', textDecoration: 'none' }}
                            onClick={handleSubmit}
                            className='my-order-btn text-center'>Go to Cart</Link>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Purchase