const express = require('express');
const { addProduct, getAllProducts,getFilteredProducts} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addProduct', addProduct);
router.get('/getProduct', getAllProducts);
router.get('/filter', getFilteredProducts);

module.exports = router;