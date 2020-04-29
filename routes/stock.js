const express = require('express');

const router = express.Router();

const { products } = require('../controllers/stock');

router.get('/products', products);

module.exports = router;
