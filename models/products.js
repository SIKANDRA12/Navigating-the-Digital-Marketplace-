const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image_url: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);