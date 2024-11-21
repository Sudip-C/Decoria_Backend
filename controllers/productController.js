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


// Controller to handle filtering, sorting, and searching
exports.getFilteredProducts = async (req, res) => {
  const { category, sort, search } = req.query;

  try {
    // Create a query object for filtering
    const query = {};
    if (category) {
      query.Category = category; // Filter by category
    }
    if (search) {
      query.Title = { $regex: search, $options: 'i' }; // Case-insensitive search in title
    }

    // Execute the query with sorting
    let products = Product.find(query);

    if (sort) {
      const sortOption = sort === 'asc' ? { Price: 1 } : { Price: -1 }; // Sort by price
      products = products.sort(sortOption);
    }

    const result = await products; // Execute the query
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

