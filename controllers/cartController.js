// controllers/cartController.js
const User = require('../models/User');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const product = await Product.findById(req.body.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    user.cart.push(product._id);
    await user.save();
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart');
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};