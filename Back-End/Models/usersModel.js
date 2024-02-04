const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    myID: String,
    name: String,
    email: String,
    password: String
})
const Users = mongoose.model('Users', UserSchema)
module.exports = Users