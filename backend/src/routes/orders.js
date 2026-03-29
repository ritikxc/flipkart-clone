const express = require('express');
const router = express.Router();
const { placeOrder, getOrderById, getOrderHistory } = require('../controllers/orderController');

router.get('/history', getOrderHistory);
router.get('/:id', getOrderById);
router.post('/', placeOrder);

module.exports = router;
