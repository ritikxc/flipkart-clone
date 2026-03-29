const express = require('express');
const router = express.Router();
const { getWishlist, toggleWishlist, checkWishlist } = require('../controllers/wishlistController');

router.get('/', getWishlist);
router.post('/toggle', toggleWishlist);
router.get('/check/:product_id', checkWishlist);

module.exports = router;
