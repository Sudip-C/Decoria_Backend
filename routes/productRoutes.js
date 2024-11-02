const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addProduct', addProduct);
router.get('/getProduct', getAllProducts);

module.exports = router;