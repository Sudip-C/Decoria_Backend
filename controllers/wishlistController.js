// controllers/wishlistController.js
const User = require('../models/User');
const Product = require('../models/Product');

exports.addToWishlist = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const product = await Product.findById(req.body.productId);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      user.wishlist.push(product._id);
      await user.save();
      res.json({ wishlist: user.wishlist });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getWishlist = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate('wishlist');
      res.json({ wishlist: user.wishlist });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  