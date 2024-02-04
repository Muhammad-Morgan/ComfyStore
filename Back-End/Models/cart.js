const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    myID: String,
    name: String,
    amount: Number,
    price: Number,
    img: String
})
const Cart = mongoose.model('cart', cartSchema)
module.exports = Cart