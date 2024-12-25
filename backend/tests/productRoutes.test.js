const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('../routes/productRoutes');
const Product = require('../moduls/ProductSchema'); // Adjust path to your Product model

const app = express();
app.use(express.json());
app.use('/products', productRoutes);

describe('Product Routes', () => {
  beforeAll(async () => {
    // Connect to in-memory database for testing
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Clean up and close the database connection
    await mongoose.connection.close();
  });

  // **Test 1: Create a product**
  it('should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      category: 'Electronics',
      stock: 10,
      image: 'http://example.com/image.jpg',
    };

    const response = await request(app).post('/products/create').send(newProduct);
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Product created successfully!');
    expect(response.body.product).toHaveProperty('_id');
    expect(response.body.product.name).toBe(newProduct.name);
  });

  // **Test 2: Get all products**
  it('should return all products', async () => {
    const response = await request(app).get('/products/');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // **Test 3: Get a product by ID**
  it('should return a product by ID', async () => {
    // Create a product first
    const newProduct = new Product({
      name: 'Test Product',
      description: 'Description of test product',
      price: 100,
      category: 'Electronics',
      stock: 10,
      image: 'http://example.com/test.jpg',
    });

    await newProduct.save();

    const response = await request(app).get(`/products/${newProduct._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', newProduct._id.toString());
    expect(response.body.name).toBe(newProduct.name);
  });

  // **Test 4: Update a product by ID**
  it('should update a product by ID', async () => {
    // Create a product first
    const newProduct = new Product({
      name: 'Old Product',
      description: 'Old description',
      price: 50,
      category: 'Misc',
      stock: 5,
      image: 'http://example.com/old.jpg',
    });

    await newProduct.save();

    const updatedProduct = {
      name: 'Updated Product',
      description: 'Updated description',
      price: 75,
      category: 'Updated',
      stock: 20,
      image: 'http://example.com/updated.jpg',
    };

    const response = await request(app)
      .put(`/products/${newProduct._id}`)
      .send(updatedProduct);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product updated successfully!');
    expect(response.body.product.name).toBe(updatedProduct.name);
  });

  // **Test 5: Delete a product by ID**
  it('should delete a product by ID', async () => {
    // Create a product first
    const newProduct = new Product({
      name: 'Product to be deleted',
      description: 'Description of product to be deleted',
      price: 120,
      category: 'Household',
      stock: 8,
      image: 'http://example.com/delete.jpg',
    });

    await newProduct.save();

    const response = await request(app).delete(`/products/${newProduct._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product deleted successfully!');

    // Verify the product is deleted
    const deletedProduct = await Product.findById(newProduct._id);
    expect(deletedProduct).toBeNull();
  });
});
