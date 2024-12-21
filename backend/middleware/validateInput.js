const validateOrderInput = (req, res, next) => {
    const { userId, products, deliveryAddress, paymentMethod } = req.body;
    
    if (!userId || !products || products.length === 0 || !deliveryAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    next();
  };
  
  module.exports = { validateOrderInput };
  