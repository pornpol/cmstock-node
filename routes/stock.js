const express = require('express');

const router = express.Router();

const {
  getProductById,
  getProductByKeyword,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/stock');

router.get('/product/:id', getProductById);
router.get('/product/keyword/:keyword', getProductByKeyword);
router.get('/products', getProducts);
router.post('/product', addProduct);
router.put('/product', updateProduct);
router.delete('/product/:id', deleteProduct);

module.exports = router;
