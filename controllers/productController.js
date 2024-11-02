// controllers/productController.js
const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const products = req.body;
  if (!Array.isArray(products)) {
    products = [products];
  }

  try {
    const product =await Product.insertMany(products);
    
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
