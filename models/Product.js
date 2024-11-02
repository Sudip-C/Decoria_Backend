
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  image: { type: String, required: true },
  Price: { type: Number, required: true },
  Category: { type: String, required: true },
  Description: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('DProduct', productSchema);
