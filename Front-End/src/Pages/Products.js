import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'
import { useGlobalContext } from '../Utilities/Context'
import Loading from '../Components/Loading'
import HorizontalNav from '../Components/HorizontalNav'
const Products = () => {
    const { userStatus, updateInfo, loading, startLoading, endLoading } = useGlobalContext()
    const navigate = useNavigate()
    const [productsList, setProductsList] = useState([])
    const [search, setSearch] = useState({
        itemName: '',
        model: ''
    })
    const findByCat = (category) => {
        if (category === 'all') {
            axios.get('http://localhost:5000/getallproducts').then(({ data }) => {
                setProductsList(data)
            }).catch(err => console.log(err))
        }
        else {
            axios.get(`http://localhost:5000/searchwithcategory?category=${category}`).then(({ data }) => {
                setProductsList(data)
            }).catch(err => console.log(err))
        }
    }
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setSearch({
            ...search,
            [name]: value
        })
        axios.get(`http://localhost:5000/searchwithname?name=${value}`).then(({ data }) => {
            setProductsList(data)
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        startLoading()
        var localToken = localStorage.getItem('localToken') || ''
        axios.get(`http://localhost:5000/auth?localToken=${localToken}`).then(({ data }) => {
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
            axios.get('http://localhost:5000/getallproducts').then(({ data }) => {
                setProductsList(data)
            }).catch(err => console.log(err))
            endLoading()
        }).catch(err => console.log(err))
    }, [userStatus])
    if (loading) return <Loading />
    return (
        <div className='container-fluid'>
            <HorizontalNav />
            <div className='col-2 sticky-top'>
                <div>
                    <label htmlFor="itemName" className="form-label my-3">Search an item</label>
                    <input className="form-control mb-4" onChange={handleChange} value={search.itemName} name="itemName" id="itemName" placeholder="Type to search..." />
                </div>
                <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item text-dark-emphasis fw-medium">category</li>
                    <button
                        onClick={() => findByCat('all')}
                        className="list-group-item text-start fw-normal text-secondary-emphasis">All</button>
                    <button
                        onClick={() => findByCat('office')}
                        className="list-group-item text-start fw-normal text-secondary-emphasis">Office</button>
                    <button
                        onClick={() => findByCat('dining')}
                        className="list-group-item text-start fw-normal text-secondary-emphasis">Dining</button>
                    <button
                        onClick={() => findByCat('livingroom')}
                        className="list-group-item text-start fw-normal text-secondary-emphasis">Living Room</button>
                    <button
                        onClick={() => findByCat('bedroom')}
                        className="list-group-item text-start fw-normal text-secondary-emphasis">Bedroom</button>
                    <button
                        onClick={() => findByCat('kids')}
                        className="list-group-item text-start fw-normal text-secondary-emphasis">Kids</button>
                </ul>
                <div>
                    <label className='ps-3 text-dark-emphasis fw-medium'>Company</label>
                    <div className="form-floating">
                        <select
                            className='ms-2 mt-3 my-dd'
                            onChange={(e) => {
                                const value = e.target.value
                                // console.log(value)
                                axios.get(`http://localhost:5000/searchwithmodel?model=${value}`,).then(({ data }) => {
                                    setProductsList(data)
                                }).catch(err => console.log(err))
                            }}
                            id="model" name='model' value={search.model} aria-label="Floating label select example">
                            <option value=''>choose</option>
                            <option value="luxora">Luxora</option>
                            <option value="modenza">Modenza</option>
                            <option value="homestead">Homestead</option>
                            <option value="artifex">Artifex</option>
                            <option value="comfora">Comfora</option>
                            <option value="ikea">Ikea</option>
                            <option value="caressa">Caressa</option>
                        </select>
                    </div>
                </div>
                <button
                    onClick={() => {
                        axios.get('http://localhost:5000/getallproducts').then(({ data }) => {
                            setProductsList(data)
                        }).catch(err => console.log(err))
                    }}
                    style={{ width: '50%', letterSpacing: '1px' }}
                    className='py-0 px-3 ms-2 mt-3 btn btn-danger'>Clear</button>
            </div>
            <div
                style={{
                    width: '80%',
                    marginLeft: 'auto',
                    marginTop: '-500px',
                    marginRight: '0'
                }}
                className='row row-cols-1 row-cols-md-2 row-cols-lg-3'>
                {
                    productsList.map((item) => {
                        const { _id, img, name, price } = item
                        return (
                            <div key={_id} className='col'>
                                <Link
                                    to={`/singleproduct/${_id}`}
                                    style={{
                                        width: '260px',
                                        textDecoration: 'none'
                                    }}
                                    className='card border-0'>
                                    <img
                                        style={{
                                            height: '170px',
                                        }}
                                        className='img-fluid rounded'
                                        src={img} />
                                    <div className='card-body'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className='m-0 text-body-emphasis'>{name}</p>
                                            <span className='text-success-emphasis'>{price}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Products