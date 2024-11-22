// controllers/cartController.js
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require("mongoose");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assumes authentication middleware sets `req.user`
    const { productId, quantity } = req.body;

    // Validate input
    if (!productId || !mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product already exists in the user's cart
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (cartItem) {
      // If the product is already in the cart, update the quantity
      cartItem.quantity += quantity;
    } else {
      // Otherwise, add a new product to the cart
      user.cart.push({ productId, quantity });
    }

    // Save the updated cart
    await user.save();

    // Return the updated cart with product details populated
    const updatedCart = await User.findById(userId).populate({
      path: "cart.productId",
      select: "Title image Price Category Description",
    });

    res.status(200).json({ cart: updatedCart.cart });
  } catch (error) {
    console.error("Add to Cart Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'cart.productId',
      select: 'Title image Price Category Description',
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cart = user.cart.map((item) => {
      if (!item.productId) {
        return null; // Handle the case where a product is removed from the database
      }

      return {
        productId: item.productId._id,
        Title: item.productId.Title,
        image: item.productId.image,
        Price: item.productId.Price,
        Category: item.productId.Category,
        Description: item.productId.Description,
        quantity: item.quantity,
      };
    }).filter((item) => item !== null); // Filter out any `null` items caused by removed products

    res.status(200).json({ cart });
  } catch (error) {
    console.error('Get Cart Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate request data
    if (!productId || quantity == null) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    

    // Find the user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the cart item
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity
    cartItem.quantity += quantity;
    await user.save();

    res.status(200).json({
      message: 'Cart updated successfully',
      cart: user.cart,
    });
  } catch (error) {
    console.error('Update Cart Quantity Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

