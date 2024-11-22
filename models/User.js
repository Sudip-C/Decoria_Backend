// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [
    { 
    productId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DProduct'
      },
    quantity: {
      type: Number,
      default: 1,
      min: 1, // Ensure quantity is always at least 1
    } }
  ],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DProduct' }],
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Check password
userSchema.methods.matchPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
