const express = require('express');
const User = require('../models/user');
const Product = require('../models/products');

const router = express.Router();

// Add to cart
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    console.log(userId,productId,quantity);

    if (!product) return res.status(404).send('Product not found');
    if (product.stock < quantity) return res.status(400).send('Insufficient stock');

    const cartItemIndex = user.cart.findIndex(item => item.product_id.equals(productId));
    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product_id: productId, quantity });
    }

    await user.save();
    res.status(200).send('Product added to cart');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// View cart
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('cart.product_id');
    if (!user) return res.status(404).send('User not found');

    const cart = user.cart.map(item => ({
      product: item.product_id.name,
      price: item.product_id.price,
      quantity: item.quantity,
      total: item.product_id.price * item.quantity,
    }));

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Remove from cart
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.cart = user.cart.filter(item => !item.product_id.equals(productId));
    await user.save();

    res.status(200).send('Product removed from cart');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
