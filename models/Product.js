const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    productName : {
        type : String
    },
    productDesc : {
        type : String
    },
    category :{
        type: String,
        lowercase : true,
        ref : 'Category'
    },
    createdAt : Date
})

module.exports = Product = mongoose.model('Product',productSchema)