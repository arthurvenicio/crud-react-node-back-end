const express = require('express');
const router = express.Router();

const {addProduct, 
       getAllProducts,
       getProduct,
       updateProduct,
       deleteProduct
      } = require('../controllers/productController');


router.post('/product', addProduct);
router.get('/products',  getAllProducts);
router.get('/product/:id', getProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);


module.exports = {
    routes: router
}