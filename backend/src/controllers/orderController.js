const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID || 1;

const placeOrder = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { address, payment_method = 'COD' } = req.body;

    if (!address || !address.full_name || !address.phone || !address.pincode ||
        !address.address_line1 || !address.city || !address.state) {
      return res.status(400).json({ error: 'Complete address required' });
    }

    // Get cart items
    const [cartItems] = await connection.query(
      `SELECT c.quantity, p.id as product_id, p.name, p.price, p.original_price, p.stock,
       (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as image
       FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?`,
      [DEFAULT_USER_ID]
    );

    if (cartItems.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    // Validate stock
    for (const item of cartItems) {
      if (item.stock < item.quantity) {
        await connection.rollback();
        return res.status(400).json({ error: `Insufficient stock for ${item.name}` });
      }
    }

    // Save address
    const [addrResult] = await connection.query(
      `INSERT INTO addresses (user_id, full_name, phone, pincode, address_line1, address_line2, city, state, address_type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [DEFAULT_USER_ID, address.full_name, address.phone, address.pincode,
       address.address_line1, address.address_line2 || '', address.city, address.state,
       address.address_type || 'home']
    );
    const addressId = addrResult.insertId;

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const originalTotal = cartItems.reduce((sum, item) => sum + (item.original_price || item.price) * item.quantity, 0);
    const discount = originalTotal - subtotal;
    const deliveryCharge = subtotal > 500 ? 0 : 40;
    const total = subtotal + deliveryCharge;

    // Create order
    const orderId = uuidv4();
    await connection.query(
      `INSERT INTO orders (id, user_id, address_id, subtotal, discount, delivery_charge, total, status, payment_method)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'placed', ?)`,
      [orderId, DEFAULT_USER_ID, addressId, subtotal, discount, deliveryCharge, total, payment_method]
    );

    // Insert order items & reduce stock
    for (const item of cartItems) {
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, product_name, product_image, price, quantity)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.name, item.image, item.price, item.quantity]
      );
      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    // Clear cart
    await connection.query('DELETE FROM cart WHERE user_id = ?', [DEFAULT_USER_ID]);

    await connection.commit();
    res.status(201).json({ orderId, total, message: 'Order placed successfully!' });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[order]] = await pool.query(
      `SELECT o.*, a.full_name, a.phone, a.pincode, a.address_line1, a.address_line2, a.city, a.state, a.address_type
       FROM orders o JOIN addresses a ON o.address_id = a.id
       WHERE o.id = ? AND o.user_id = ?`,
      [id, DEFAULT_USER_ID]
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const [items] = await pool.query(
      'SELECT * FROM order_items WHERE order_id = ?',
      [id]
    );

    res.json({ ...order, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT o.id, o.total, o.status, o.placed_at, o.payment_method,
       COUNT(oi.id) as item_count
       FROM orders o LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = ?
       GROUP BY o.id ORDER BY o.placed_at DESC`,
      [DEFAULT_USER_ID]
    );

    // Get first item image for each order
    for (const order of orders) {
      const [[firstItem]] = await pool.query(
        'SELECT product_name, product_image FROM order_items WHERE order_id = ? LIMIT 1',
        [order.id]
      );
      order.preview = firstItem || null;
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { placeOrder, getOrderById, getOrderHistory };
