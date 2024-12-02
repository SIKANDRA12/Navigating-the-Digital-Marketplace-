const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cartRoutes = require('./router/cart.js');

const app = express();
const port = 8080;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Middleware
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
  res.render("index.ejs");
});


// Start server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
