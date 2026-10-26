import { query, pool } from '../config/db.js';

// Fallback in-memory catalog for server demo
const FALLBACK_PRODUCTS = [
  { id: 'art-1', slug: 'dreaming-in-color', name: 'Dreaming in Color', category: 'Art & Drawings', subcategory: 'Colorful Drawings', price: 899, stock: 9, rating: 4.9 },
  { id: 'paint-1', slug: 'midnight-bloom', name: 'Midnight Bloom', category: 'Paintings', subcategory: 'Abstract Paintings', price: 1899, stock: 4, rating: 5.0 },
  { id: 'clay-sm-1', slug: 'tiny-panda', name: 'Tiny Panda', category: 'Clay Art', subcategory: 'Small Clay Art', price: 349, stock: 15, rating: 4.9 },
  { id: 'clay-an-1', slug: 'anime-star', name: 'Anime Star Chibi', category: 'Clay Art', subcategory: 'Anime Clay Art', price: 649, stock: 7, rating: 5.0 },
  { id: 'clay-ct-1', slug: 'happy-buddy', name: 'Happy Buddy', category: 'Clay Art', subcategory: 'Cartoon Clay Art', price: 319, stock: 17, rating: 4.9 },
  { id: 'clay-kc-1', slug: 'lucky-charm-keychain', name: 'Lucky Four-Leaf Clover Charm', category: 'Clay Art', subcategory: 'Keychains', price: 249, stock: 25, rating: 4.9 },
  { id: 'clay-pp-1', slug: 'pencil-pal', name: 'Pencil Pal - Little Sloth', category: 'Clay Art', subcategory: 'Pen & Pencil Designer', price: 199, stock: 24, rating: 4.9 }
];

export const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;

    if (pool) {
      try {
        let sql = 'SELECT * FROM products WHERE 1=1';
        const values = [];
        let index = 1;

        if (category) {
          sql += ` AND (LOWER(category) = LOWER($${index}) OR LOWER(subcategory) = LOWER($${index}))`;
          values.push(category);
          index++;
        }

        if (search) {
          sql += ` AND (LOWER(name) LIKE $${index} OR LOWER(description) LIKE $${index})`;
          values.push(`%${search.toLowerCase()}%`);
          index++;
        }

        if (minPrice) {
          sql += ` AND price >= $${index}`;
          values.push(Number(minPrice));
          index++;
        }

        if (maxPrice) {
          sql += ` AND price <= $${index}`;
          values.push(Number(maxPrice));
          index++;
        }

        if (sort === 'price-low') sql += ' ORDER BY price ASC';
        else if (sort === 'price-high') sql += ' ORDER BY price DESC';
        else if (sort === 'popularity') sql += ' ORDER BY reviews_count DESC';
        else sql += ' ORDER BY created_at DESC';

        const result = await query(sql, values);
        if (result && result.rows) {
          return res.json({ products: result.rows, total: result.rowCount, source: 'postgresql' });
        }
      } catch (dbErr) {
        console.warn('DB query error, using server fallback:', dbErr.message);
      }
    }

    // In-memory fallback
    let list = [...FALLBACK_PRODUCTS];
    if (category) {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase() || p.subcategory.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    res.json({ products: list, total: list.length, source: 'in-memory' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error while fetching products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (pool) {
      try {
        const result = await query('SELECT * FROM products WHERE id = $1 OR slug = $1 LIMIT 1', [id]);
        if (result && result.rows[0]) {
          return res.json(result.rows[0]);
        }
      } catch (dbErr) {
        console.warn('DB query single error:', dbErr.message);
      }
    }

    const found = FALLBACK_PRODUCTS.find(p => p.id === id || p.slug === id);
    if (!found) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
