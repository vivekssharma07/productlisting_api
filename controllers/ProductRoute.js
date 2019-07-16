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

//Listing all categories and the associated products (2nd Task Logic)
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

//Send  deleted records as a response (3rd Task Logic )
router.post('/deleteCategory',async (req,res) => {
    const category_type = req.body.category_type;
    
    try {
        await Category.findOneAndDelete({category_type:category_type});
        const products = await Product.find({category : category_type });
        await Product.deleteMany({category:category_type});
        res.json({'DeletedProducts':products});
    } catch (err) {
        res.status(422).send(err);
    }
})

module.exports = router;