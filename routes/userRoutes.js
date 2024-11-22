// routes/userRoutes.js
const express = require('express');
const { signup, login } = require('../controllers/authController');
const { addToCart, getCart,updateCartQuantity} = require('../controllers/cartController');
const { addToWishlist, getWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

// Auth routes
router.post('/signup', signup);
router.post('/login', login);

// Cart routes
router.post('/cart', protect, addToCart);
router.get('/cart', protect, getCart);
router.patch('/cart/quantity', protect, updateCartQuantity);

// Wishlist routes
router.post('/wishlist', protect, addToWishlist);
router.get('/wishlist', protect, getWishlist);

module.exports = router;
