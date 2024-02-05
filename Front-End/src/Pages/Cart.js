import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import { useGlobalContext } from '../Utilities/Context'
import Loading from '../Components/Loading'
import HorizontalNav from '../Components/HorizontalNav'

const Cart = () => {
    const { showAlert, loading, startLoading, endLoading, userInfo, updateInfo } = useGlobalContext()
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [cost, setCost] = useState({
        totalAmount: 0,
        totalCost: 0
    })
    const calcTotal = () => {
        if (!loading && cartItems.length > 0) {
            let { totalAmount, totalCost } = cartItems.reduce((cartTotal, items) => {
                const { amount, price } = items;
                const numAmount = Number(amount)
                cartTotal.totalAmount += numAmount
                cartTotal.totalCost += numAmount * price
                return cartTotal

            }, { totalAmount: 0, totalCost: 0 })
            totalCost = parseFloat(totalCost.toFixed(2))
            setCost({
                ...cost,
                totalAmount,
                totalCost
            })
        }

    }
    const handleClick = (e) => {
        e.preventDefault()
        var localToken = localStorage.getItem('localToken') || ''
        axios.get(`https://server-store-beta.vercel.app/auth?localToken=${localToken}`).then(({ data }) => {
            const { myToken, state } = data
            if (state !== 'success') {
                navigate('/login')
            }
            const myData = jwtDecode(myToken)
            const { name, myID } = myData
            updateInfo({
                name,
                id: myID
            })
            axios.get(`https://server-store-beta.vercel.app/getmyitems?myID=${myID}`).then(({ data }) => {
                setCartItems(data)
            }).catch(err => console.log(err))
        })
    }
    const handleDelete = (_id) => {
        axios.delete(`https://server-store-beta.vercel.app/deleteitem?_id=${_id}`).then(({ data }) => {
            const { msg, type } = data
            var localToken = localStorage.getItem('localToken') || ''
            axios.get(`https://server-store-beta.vercel.app/auth?localToken=${localToken}`).then(({ data }) => {
                const { myToken, state } = data
                if (state !== 'success') {
                    navigate('/login')
                }
                const myData = jwtDecode(myToken)
                const { name, myID } = myData
                updateInfo({
                    name,
                    id: myID
                })
                axios.get(`https://server-store-beta.vercel.app/getmyitems?myID=${myID}`).then(({ data }) => {
                    setCartItems(data)
                }).catch(err => console.log(err))
            })
            showAlert({ msg, type })
        }).catch(err => console.log(err))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setCartItems([])
        showAlert({ msg: 'proceed to the payment', type: 'info' })
        navigate('/purchase')
    }
    useEffect(() => {
        startLoading()
        var localToken = localStorage.getItem('localToken') || ''
        axios.get(`https://server-store-beta.vercel.app/auth?localToken=${localToken}`).then(({ data }) => {
            const { myToken, state } = data
            if (state !== 'success') {
                navigate('/login')
            }
            const myData = jwtDecode(myToken)
            const { name, myID } = myData
            updateInfo({
                name,
                id: myID
            })
            axios.get(`https://server-store-beta.vercel.app/getmyitems?myID=${myID}`).then(({ data }) => {
                setCartItems(data)
            }).catch(err => console.log(err))
            endLoading()
        })
    }, [userInfo.name]);
    useEffect(() => {
        calcTotal()
    }, [cartItems])
    if (loading) return <Loading />
    return (
        <article className='container-fluid'>
            <HorizontalNav />
            {cartItems.length === 0 ?
                <div className='d-flex justify-content-center flex-column align-items-center'>
                    <h1 className='text-danger fs-3 mb-4'>Your cart is empty...</h1>
                    <br />
                    <Link
                        to='/products'
                        style={{ textDecoration: 'none' }}
                        className='my-order-btn text-center'>Fill it !</Link>
                </div> :
                <div className='row row-cols-1 row-cols-md-2'>
                    <section className='col'>
                        {cartItems.map(({ _id, name, price, amount, img }) => {
                            return (
                                <div key={_id} className='d-flex mb-3 justify-content-between align-items-center'>
                                    <div style={{ width: '80%' }} className='d-flex flex-column'>
                                        <img
                                            style={{ height: '120px', width: '80%' }}
                                            className='img-fluid rounded' src={img} />
                                        <div className='d-flex justify-content-between'>
                                            <p className='mb-0'>{name}</p>
                                            <p className='mb-0'>{price}$</p>
                                        </div>
                                    </div>
                                    <p className='mb-0 fs-4' style={{ width: '20%' }}>{amount} </p>
                                    <select
                                        style={{ width: '50%' }}
                                        className='me-3 my-dd'
                                        onChange={(e) => {
                                            const value = e.target.value
                                            axios.put(`https://server-store-beta.vercel.app/updateitem?_id=${_id}`, { newAmount: Number(value) }).then().catch(err => console.log(err))
                                        }}
                                        id="model" name='model' aria-label="Floating label select example">
                                        <option value=''>amount</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button
                                            style={{ fontSize: '.9rem', width: 'fit-content' }}
                                            onClick={handleClick}
                                            className='my-order-btn text-center px-1'>Change</button>
                                        <button
                                            style={{ fontSize: '.9rem', marginRight: '0', paddingBlock: '.4rem' }}
                                            onClick={() => handleDelete(_id)}
                                            className='ms-3 log-out text-center'>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                    <section style={{ height: '100%' }} className='col'>
                        <div style={{ height: '100%' }} className='d-flex flex-column justify-content-between'>
                            <table className="table table-secondary rounded">
                                <thead>
                                    <tr>
                                        <th scope="col">Total Price</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col">{cost.totalCost} $</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Total Amount</td>
                                        <td></td>
                                        <td></td>
                                        <td>{cost.totalAmount} Items</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td></td>
                                        <td></td>
                                        <td>9.99$</td>
                                    </tr>
                                    <tr>
                                        <td>Final Cost</td>
                                        <td></td>
                                        <td></td>
                                        <td>{parseFloat((cost.totalCost + 9.88).toFixed(2))}$</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='d-flex justify-content-center mt-4'>
                                <button
                                    style={{ width: '97%' }}
                                    onClick={handleSubmit}
                                    className='submit-bt'>Place Your Order !</button>
                            </div>
                        </div>
                    </section>
                </div>}
        </article>
    )
}

export default Cart