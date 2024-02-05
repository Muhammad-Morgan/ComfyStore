import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../Utilities/Context'
import Loading from '../Components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import HorizontalNav from '../Components/HorizontalNav'

const SingleProduct = () => {
    const { showAlert, userInfo, loading, startLoading, endLoading, updateInfo } = useGlobalContext()
    const { id } = useParams()
    const navigate = useNavigate()
    const [myProduct, setMyProduct] = useState({
        name: '',
        img: '',
        price: 0,
        desc: '',
        category: '',
        model: ''
    })
    const [counter, setCounter] = useState(0)
    const handleClick = (e) => {
        e.preventDefault()
        const cartInfo = {
            myID: userInfo.id,
            name: myProduct.name,
            price: myProduct.price,
            img: myProduct.img,
            amount: counter,
        }
        var localToken = localStorage.getItem('localToken') || ''
        axios.post(`http://localhost:5000/additem?token=${localToken}`, { ...cartInfo }).then(({ data }) => {
            const { msg, type } = data
            if (type === 'danger') {
                showAlert({
                    msg,
                    type
                })
                navigate('/login')
            }
            showAlert({
                msg,
                type
            })
            navigate('/cart')
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        startLoading()
        axios.get('http://localhost:5000/auth').then(({ data }) => {
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
            axios.get(`http://localhost:5000/singleproduct?_id=${id}`).then(({ data }) => {
                const {
                    name,
                    img,
                    price,
                    desc,
                    category,
                    model
                } = data
                setMyProduct({
                    ...myProduct,
                    name,
                    img,
                    price,
                    desc,
                    category,
                    model
                })
            }).catch(err => console.log(err))
            endLoading()
        })
    }, [userInfo?.name])
    if (loading) return <Loading />
    return (
        <div className='container-fluid'>
            <HorizontalNav />
            <section className='row row-cols-1 row-cols-md-2 align-items-center'>
                <div className='col'>
                    <img
                        style={{ height: '550px', width: '100%' }}
                        className='img-fluid' src={myProduct.img} />
                </div>
                <div className='col'>
                    <section>
                        <div class="row">
                            <div className='col-3'>
                                <p className='fs-5 text-secondary'>Name</p>
                            </div>
                            <div className='col-9'>
                                <p className='fs-5 text-secondary-emphasis'>{myProduct.name}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div className='col-3'>
                                <p className='fs-5 text-secondary'>Company</p>
                            </div>
                            <div className='col-9'>
                                <p className='fs-5 text-secondary-emphasis'>{myProduct.model}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div className='col-3'>
                                <p className='fs-5 text-secondary'>Price</p>
                            </div>
                            <div className='col-9'>
                                <p className='fs-5 text-secondary-emphasis'>{myProduct.price}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div className='col-3'>
                                <p className='fs-5 text-secondary'>Description</p>
                            </div>
                            <div className='col-9'>
                                <p className='text-secondary-emphasis'>{myProduct.desc}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <p className="fs-5 text-secondary">Quantity</p>
                            </div>
                            <div className='col'>
                                <div className="btn-group" role="group" aria-label="Default button group">
                                    <button
                                        onClick={() => setCounter(counter - 1)}
                                        className="counter-btns">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </button>
                                    <div className="counter">{counter}</div>
                                    <button
                                        onClick={() => setCounter(counter + 1)}
                                        className="counter-btns">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-start mt-4'>
                            <button
                                onClick={handleClick}
                                className='my-order-btn'>Place Your Order !</button>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}

export default SingleProduct