const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    category: String,
    img: String,
    name: String,
    price: Number,
    model: String,
    desc: String,
})
const productsCollection = mongoose.model('productsCollection', productsSchema)
module.exports = productsCollection