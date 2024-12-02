const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  added_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Cartitem", CartItemSchema);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  cart: [CartItemSchema],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
