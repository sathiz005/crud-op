const mongoose = require('mongoose')
const shoppingCart = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quatity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("cart",shoppingCart)