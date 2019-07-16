const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
   
    category_type : {
        type : String,
        unique : true,
        required :true,
        lowercase : true
    }
})

module.exports = Category = mongoose.model('Category',categorySchema)