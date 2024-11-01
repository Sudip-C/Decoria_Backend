
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
  stock: { type: Number, default: 0 },
});

module.exports = mongoose.model('DProduct', productSchema);
