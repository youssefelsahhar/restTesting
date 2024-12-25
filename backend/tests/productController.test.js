const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Product = require('../moduls/ProductSchema');
const productController = require('../controllers/productController');
const httpMocks = require('node-mocks-http');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

afterEach(async () => {
  await Product.deleteMany();
});

describe('Product Controller', () => {
  it('should create a new product', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/products',
      body: {
        name: 'Test Product',
        description: 'This is a test product',
        price: 100,
        category: 'Electronics',
        stock: 10,
        image: 'http://example.com/image.jpg',
      },
    });

    const res = httpMocks.createResponse();

    await productController.createProduct(req, res);

    expect(res.statusCode).toBe(201);
    const data = JSON.parse(res._getData());
    expect(data.message).toBe('Product created successfully!');
    expect(data.product.name).toBe('Test Product');
  });

  it('should return all products', async () => {
    await Product.create({
      name: 'Product 1',
      price: 50,
    });

    await Product.create({
      name: 'Product 2',
      price: 150,
    });

    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/products',
    });

    const res = httpMocks.createResponse();

    await productController.getAllProducts(req, res);

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.length).toBe(2);
  });

  it('should return a product by ID', async () => {
    const product = await Product.create({
      name: 'Test Product',
      price: 100,
    });

    const req = httpMocks.createRequest({
      method: 'GET',
      url: `/products/${product._id}`,
      params: { id: product._id },
    });

    const res = httpMocks.createResponse();

    await productController.getProductById(req, res);

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.name).toBe('Test Product');
  });

  it('should update a product', async () => {
    const product = await Product.create({
      name: 'Test Product',
      price: 100,
      stock: 10,
    });

    const req = httpMocks.createRequest({
      method: 'PUT',
      url: `/products/${product._id}`,
      params: { id: product._id },
      body: { name: 'Updated Product', stock: 20 },
    });

    const res = httpMocks.createResponse();

    await productController.updateProduct(req, res);

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.message).toBe('Product updated successfully!');
    expect(data.product.name).toBe('Updated Product');
    expect(data.product.stock).toBe(20);
  });

  it('should delete a product', async () => {
    const product = await Product.create({
      name: 'Test Product',
      price: 100,
    });

    const req = httpMocks.createRequest({
      method: 'DELETE',
      url: `/products/${product._id}`,
      params: { id: product._id },
    });

    const res = httpMocks.createResponse();

    await productController.deleteProduct(req, res);

    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.message).toBe('Product deleted successfully!');

    const deletedProduct = await Product.findById(product._id);
    expect(deletedProduct).toBeNull();
  });

  it('should return 404 when trying to get a non-existent product', async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/products/invalidId',
      params: { id: 'invalidId' },
    });

    const res = httpMocks.createResponse();

    await productController.getProductById(req, res);

    expect(res.statusCode).toBe(500);
    const data = JSON.parse(res._getData());
    expect(data.message).toBe('Error fetching product');
  });
});
