import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Error from './Pages/Error'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Auth from './Pages/Auth'
import Products from './Pages/Products'
import SingleProduct from './Pages/SingleProduct'
import Alert from "./Components/Alert";
import Nav from "./Components/Nav";
import Sidebar from "./Components/Sidebar";
import Cart from './Pages/Cart'
import Purchase from './Pages/Purchase'
function App() {
    return (
        <>
            <Router>
                <Nav />
                <Sidebar />
                <main>
                    <Alert />
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/auth' element={<Auth />} />
                        <Route path='/products' element={<Products />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/purchase' element={<Purchase />} />
                        <Route path='/singleproduct/:id' element={<SingleProduct />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                </main >
            </Router>
        </>
    )
}

export default App;