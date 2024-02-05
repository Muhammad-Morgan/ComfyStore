import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../Utilities/Context'
import { jwtDecode } from 'jwt-decode'
import Loading from '../Components/Loading'
const Auth = () => {
    const {  userStatus, loading, startLoading, endLoading, updateInfo } = useGlobalContext()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    useEffect(() => {
        startLoading()
        var localToken = localStorage.getItem('localToken') || ''
        axios.get(`http://localhost:5000/auth?localToken=${localToken}`).then(({ data }) => {
            if (data.state !== 'success') {
                navigate('/login')
                endLoading()
            }
            const myData = jwtDecode(data?.myToken)
            const { myID, name } = myData
            updateInfo({
                name,
                id: myID
            })
            endLoading()
        }).catch(err => console.log(err))
    }, [userStatus]);
    if (loading) { return <Loading /> }
    return (
        <div

            className='container'>
            <h1>You are Authorized !</h1>
        </div>
    )
}

export default Auth