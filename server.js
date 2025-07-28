const express = require('express');
const app = express();
const PORT = 3000; // you can choose any available port

// Example in-memory data for the RESTful API
const products = [
  { id: 1, name: 'Laptop', price: 599 },
  { id: 2, name: 'Smartphone', price: 299 },
  { id: 3, name: 'Headphones', price: 99 }
];

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Dynamic route: return current server time as JSON
app.get('/api/time', (req, res) => {
  res.json({ time: new Date().toISOString() });
});

// Dynamic route: greet user with name from route parameter
app.get('/api/greet/:name', (req, res) => {
  const name = req.params.name;
  res.json({ message: `Hello, ${name}!` });
});

// RESTful API: get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// RESTful API: get a product by id
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

