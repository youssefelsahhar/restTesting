// productController.js
const Product = require('../moduls/ProductSchema'); // Import the Product model

// **Create Product** - Declarative Approach
exports.createProduct = async (req, res) => {
  console.log(req.body); // Log the incoming request body
  
  const { name, description, price, category, stock, image } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required.' });
  }
  
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: 'Product created successfully!',
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// **Get All Products** - immperative Approach
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Declarative: I want all products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// **Get Single Product** - Declarative Approach
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id); // Declarative query: fetch by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// **Update Product** - Imperative Approach
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock, image } = req.body;

  try {
    // Fetch the product and update imperatively
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.status(200).json({
      message: 'Product updated successfully!',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// **Delete Product** - Imperative Approach
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id); // Imperative: find and delete
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
