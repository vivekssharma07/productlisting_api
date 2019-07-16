const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const mongoose = require('mongoose');
const productRoute = require('./controllers/ProductRoute');
const MONGOURI = 'mongodb://root:Vivek07$@ds221435.mlab.com:21435/product_listing';

app.use(bodyParser.json());
app.use('/api',productRoute);

mongoose.connect(MONGOURI,{useNewUrlParser:true,useCreateIndex :true}).then(()=>{
    console.log("Connected to database")
})

app.listen(PORT,()=>{
    console.log("App is running on server",PORT);
})

