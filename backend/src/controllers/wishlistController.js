const pool = require('../config/database');
const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 1;

const getWishlist = async (req, res) => {
  try {
    const [items] = await pool.query(
      `SELECT w.id, w.added_at, p.id as product_id, p.name, p.price, p.original_price, p.rating, p.rating_count, p.brand, p.stock,
       (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as image
       FROM wishlist w JOIN products p ON w.product_id = p.id
       WHERE w.user_id = ? ORDER BY w.added_at DESC`,
      [DEFAULT_USER_ID]
    );
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;
    const [[existing]] = await pool.query(
      'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
      [DEFAULT_USER_ID, product_id]
    );
    if (existing) {
      await pool.query('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?', [DEFAULT_USER_ID, product_id]);
      res.json({ wishlisted: false, message: 'Removed from wishlist' });
    } else {
      await pool.query('INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)', [DEFAULT_USER_ID, product_id]);
      res.json({ wishlisted: true, message: 'Added to wishlist' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkWishlist = async (req, res) => {
  try {
    const { product_id } = req.params;
    const [[item]] = await pool.query(
      'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
      [DEFAULT_USER_ID, product_id]
    );
    res.json({ wishlisted: !!item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getWishlist, toggleWishlist, checkWishlist };
