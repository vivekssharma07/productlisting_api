const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const Category = require('../models/Category')

//Add Product details 
router.post('/addProducts', async (req,res) => {
    const {productName,productDesc,category} = req.body;
    
    const newProduct = new Product({
        productName,
        productDesc,
        category ,
        createdAt : Date.now()
    })

    try {
        const product = await newProduct.save();
        res.json({'Data':product})

    } catch(err) {
        res.status(422).send(err);
    }
    
})

//Add types of category for the product
router.post('/addCategory' ,async (req,res) => {
  const newCategory = new Category({
      category_type : req.body.category_type
  })

  try {
    const category = await newCategory.save();
    res.send({'Data' :category})
  } catch(err) {
    res.status(422).send({'error' : err.errmsg});
  }
})

//Listing all categories and the associated products
router.get('/getProducts',(req,res) => {
   try {
        Category.aggregate([
            {
                $lookup:
                {
                    from: "products",
                    localField: "category_type",
                    foreignField: "category",
                    as: "product_details"
                }
            }
        ]).exec(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
   } catch(err) {
      res.status(422).send(err);
   }
}) 

module.exports = router;