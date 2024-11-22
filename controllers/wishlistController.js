// controllers/wishlistController.js
const User = require('../models/User');
const Product = require('../models/Product');

exports.addToWishlist = async (req, res) => {
    try {
      const {productId}=req.body;

      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const isInWishlist = user.wishlist.some(
        (wishlistItem) => wishlistItem.toString() === productId
      );

      if (isInWishlist) {
        return res.status(400).json({ message: 'Product is already in the Wishlist' });
      }
  
      user.wishlist.push(productId);
      await user.save();
      res.status(200).json({
        message: 'Product added to Wishlist',
        wishlist: user.wishlist,
      });
    } catch (error) {
      console.error('Add to Cart Error:', error.message);
      res.status(500).json({ message: 'Server error' });    }
  };
  
  exports.getWishlist = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('wishlist');
      res.json({ wishlist: user.wishlist });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  