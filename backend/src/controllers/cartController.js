const pool = require('../config/database');
const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 1;

const getCart = async (req, res) => {
  try {
    const [items] = await pool.query(
      `SELECT c.id, c.quantity, c.added_at,
       p.id as product_id, p.name, p.price, p.original_price, p.stock, p.brand,
       (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as image
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?
       ORDER BY c.added_at DESC`,
      [DEFAULT_USER_ID]
    );

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const originalTotal = items.reduce((sum, item) => sum + (item.original_price || item.price) * item.quantity, 0);
    const discount = originalTotal - subtotal;
    const deliveryCharge = subtotal > 500 ? 0 : 40;
    const total = subtotal + deliveryCharge;

    res.json({ items, subtotal, discount, deliveryCharge, total, itemCount: items.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    if (!product_id) return res.status(400).json({ error: 'product_id is required' });

    // Check stock
    const [[product]] = await pool.query('SELECT stock FROM products WHERE id = ?', [product_id]);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    await pool.query(
      `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
      [DEFAULT_USER_ID, product_id, quantity]
    );
    res.json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity < 1) return res.status(400).json({ error: 'Valid quantity required' });

    // Check stock
    const [[cartItem]] = await pool.query(
      'SELECT c.product_id, p.stock FROM cart c JOIN products p ON c.product_id = p.id WHERE c.id = ? AND c.user_id = ?',
      [id, DEFAULT_USER_ID]
    );
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });
    if (cartItem.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    await pool.query(
      'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, id, DEFAULT_USER_ID]
    );
    res.json({ message: 'Cart updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM cart WHERE id = ? AND user_id = ?', [id, DEFAULT_USER_ID]);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await pool.query('DELETE FROM cart WHERE user_id = ?', [DEFAULT_USER_ID]);
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
