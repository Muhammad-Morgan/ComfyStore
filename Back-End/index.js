const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwtDecode = require('jwt-decode')

const Users = require('./Models/usersModel')
const productsCollection = require('./Models/products')
const Cart = require('./Models/cart')
// const products = require('./data')
const app = express()

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())
const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json("No token")
    }
    else {
        jwt.verify(token, 'thesecretmessageofuser', (err, decode) => {
            if (err) return res.json('wrong token')
            next()
        })
    }
}
mongoose.connect('mongodb+srv://muhammad:helloworld123@jobster.r7jsbjp.mongodb.net/comfy?retryWrites=true&w=majority')
mongoose.connection.once('open', () => console.log('Connected to MongoDB'))
app.get('/', (req, res) => res.send('Hi there...'))

app.get('/auth', verifyUser, (req, res) => {
    const token = req.cookies.token
    return res.json({ myToken: token, state: 'success' })
})
app.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.json({ msg: 'Logged Out', type: 'success' })
})
app.get('/getallproducts', (req, res) => {
    productsCollection.find().then((result) => res.json(result)).catch(err => console.log(err))
})
app.get('/searchwithname', (req, res) => {
    const { name } = req.query
    productsCollection.find().then((result) => {
        var newRes = result.filter((item) => item.name.includes(name))
        res.json(newRes)
        // console.log(newRes)
    })
})
app.get('/searchwithcategory', (req, res) => {
    const { category } = req.query
    productsCollection.find().then((result) => {
        var newResults = result.filter((item) => item.category === category)
        res.json(newResults)
    })
})
app.get('/searchwithmodel', (req, res) => {
    const { model } = req.query
    productsCollection.find().then((result) => {
        var newResults = result.filter((item) => item.model === model)
        res.json(newResults)
    })
})
app.get('/singleproduct', (req, res) => {
    const { _id } = req.query
    productsCollection.findById(_id).then((result) => res.json(result)).catch(err => console.log(err))
})
app.get('/getmyitems', (req, res) => {
    const { myID } = req.query
    Cart.find().then((result) => {
        var newResults = result.filter((item) => item.myID === myID)
        res.json(newResults)
    }).catch(err => console.log(err))
})
app.put('/updateitem', (req, res) => {
    const { _id } = req.query
    const { newAmount } = req.body
    Cart.findByIdAndUpdate(_id, { amount: newAmount }).then(() => {
        Cart.findById(_id).then((result) => res.json({ msg: 'item was updated', type: 'success', result })
        )
    }).catch(err => console.log(err))
})
app.post('/additem', (req, res) => {
    const token = req.cookies.token
    if (!token) {
        res.json({ msg: 'session expired', type: 'danger' })
    }
    else {
        jwt.verify(token, 'thesecretmessageofuser', (err, decode) => {
            if (err) return res.json({ msg: 'wrong token', type: 'danger' })
            else {
                const { myID, name, amount, price, img } = req.body
                var totalAmount = amount * price
                Cart.create({
                    myID,
                    name,
                    amount,
                    price: totalAmount,
                    img
                }).then(() => res.json({
                    msg: 'Item was added...',
                    type: 'success'
                })
                ).catch(err => console.log(err))
            }
        })
    }
})
app.post('/register', (req, res) => {
    const { myID, name, email, password } = req.body
    if (name, email, password) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                Users.create({
                    myID,
                    name,
                    email,
                    password: hash
                }).then(() => res.json({
                    msg: 'Registered Successfully',
                    type: 'success'
                })).catch(error => console.log(error))
            });
        });
        const token = jwt.sign({ myID, name }, 'thesecretmessageofuser', { expiresIn: '1h' })
        res.cookie('token', token, { maxAge: 1 * 60 * 60 * 1000 })
    } else {
        res.json({
            msg: 'Enter your credentials',
            type: 'info'
        })
    }
})
app.post('/login', (req, res) => {
    const { email, password } = req.body
    if (email, password) {
        Users.findOne({ email }).then((result) => {
            if (result === null) {
                res.json({ msg: 'No users yet', type: 'danger' })
            } else {
                const { myID, name } = result
                bcrypt.compare(password, result.password).then((resultCondition) => {
                    if (resultCondition === true) {
                        const token = jwt.sign({ myID, name }, 'thesecretmessageofuser', { expiresIn: '1h' })
                        res.cookie('token', token, { maxAge: 1 * 60 * 60 * 1000 })
                        res.json({
                            msg: 'Logged In Successfully',
                            type: 'success'
                        })
                    } else {
                        res.json({
                            msg: 'Wrong password',
                            type: 'danger'
                        })
                    }
                })
            }
        })
    }
    else {
        res.json({
            msg: 'Enter your credentials',
            type: 'info'
        })
    }
})
app.delete('/deleteitem', (req, res) => {
    const { _id } = req.query
    Cart.findByIdAndDelete(_id).then(() => res.json({ msg: 'item deleted', type: 'info' })).catch(err => console.log(err))
})
app.delete('/clearcart',(req,res)=>{
    const {myID}=req.query
    Cart.deleteMany({myID}).then(()=>res.json('cleared !')).catch(err=>console.log(err))
})
app.listen(5000, () => console.log('Listening to port 5000'))