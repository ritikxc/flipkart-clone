const pool = require('../config/database');

/** Listing filters use aliases p, c — duplicate for dedupe subquery (p_d, c_d). */
const whereClauseForDedupAliases = (whereClause) =>
  whereClause.replace(/\bp\./g, 'p_d.').replace(/\bc\./g, 'c_d.');

// Get all products with filters (one row per catalog item: category + name; fixes duplicate DB rows from re-seeding)
const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort, page = 1, limit = 20 } = req.query;
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const offset = (pageNum - 1) * limitNum;
    let conditions = [];
    let params = [];

    if (category) {
      conditions.push('c.slug = ?');
      params.push(category);
    }
    if (search) {
      conditions.push('(p.name LIKE ? OR p.brand LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    if (minPrice) {
      conditions.push('p.price >= ?');
      params.push(minPrice);
    }
    if (maxPrice) {
      conditions.push('p.price <= ?');
      params.push(maxPrice);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const whereDedup = whereClauseForDedupAliases(whereClause);

    let orderClause = 'ORDER BY p.created_at DESC';
    if (sort === 'price_asc') orderClause = 'ORDER BY p.price ASC';
    else if (sort === 'price_desc') orderClause = 'ORDER BY p.price DESC';
    else if (sort === 'rating') orderClause = 'ORDER BY p.rating DESC';
    else if (sort === 'popularity') orderClause = 'ORDER BY p.rating_count DESC';

    const [products] = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug,
       (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as primary_image
       FROM products p
       INNER JOIN (
         SELECT MIN(p_d.id) AS keep_id
         FROM products p_d
         LEFT JOIN categories c_d ON p_d.category_id = c_d.id
         ${whereDedup}
         GROUP BY p_d.category_id, p_d.name
       ) catalog ON p.id = catalog.keep_id
       LEFT JOIN categories c ON p.category_id = c.id
       ${orderClause}
       LIMIT ? OFFSET ?`,
      [...params, limitNum, offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM (
         SELECT 1 AS _one
         FROM products p_d
         LEFT JOIN categories c_d ON p_d.category_id = c_d.id
         ${whereDedup}
         GROUP BY p_d.category_id, p_d.name
       ) deduped`,
      params
    );

    res.json({ products, total, page: pageNum, pages: Math.ceil(total / limitNum) || 1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product with all images and details
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[product]] = await pool.query(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [id]
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const [images] = await pool.query(
      `SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order ASC`,
      [id]
    );

    // Related products (dedupe by category + name so re-seeded duplicates don’t appear twice)
    const [related] = await pool.query(
      `SELECT p.*, (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as primary_image
       FROM products p
       INNER JOIN (
         SELECT MIN(p2.id) AS keep_id
         FROM products p2
         WHERE p2.category_id = ? AND p2.id != ?
         GROUP BY p2.category_id, p2.name
       ) catalog ON p.id = catalog.keep_id
       ORDER BY p.rating_count DESC
       LIMIT 8`,
      [product.category_id, id]
    );

    res.json({ ...product, images, related });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(
      `SELECT c.id, c.name, c.slug, c.icon, c.created_at,
       COUNT(DISTINCT CONCAT_WS(0x1E, p.category_id, p.name)) AS product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id
       GROUP BY c.id, c.name, c.slug, c.icon, c.created_at
       ORDER BY c.name`
    );
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProducts, getProductById, getCategories };
