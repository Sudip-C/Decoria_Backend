const express = require('express');
const { addProduct, getSingleProduct,getAllProducts,getFilteredProducts} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addProduct', addProduct);
router.get('/getProduct', getAllProducts);
router.get('/filter', getFilteredProducts);
router.get('/:id', getSingleProduct);


module.exports = router;