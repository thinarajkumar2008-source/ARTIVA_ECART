import { query, pool } from '../config/db.js';

const inMemoryOrders = [];

export const createOrder = async (req, res) => {
  try {
    const { customer, items, discount = 0, paymentMethod } = req.body;

    if (!customer || !customer.fullName || !customer.email || !customer.phone || !customer.address) {
      return res.status(400).json({ error: 'Missing required customer information.' });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item.' });
    }

    // Server-side recalculation of totals
    const calculatedSubtotal = items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
      return sum + (price * qty);
    }, 0);

    const calculatedShipping = calculatedSubtotal >= 999 ? 0 : 79;
    const finalAmount = Math.max(0, calculatedSubtotal + calculatedShipping - (Number(discount) || 0));
    const orderId = 'ARTIVA-' + Math.floor(100000 + Math.random() * 900000);

    // Save to PostgreSQL if connected
    if (pool) {
      try {
        const orderInsertSql = `
          INSERT INTO orders (
            order_id, customer_name, customer_email, customer_phone,
            shipping_address, city, state, postal_code, delivery_instructions,
            subtotal, shipping_fee, discount_amount, total_amount,
            status, payment_method
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          RETURNING *;
        `;
        const orderValues = [
          orderId,
          customer.fullName,
          customer.email,
          customer.phone,
          customer.address,
          customer.city || '',
          customer.state || '',
          customer.postalCode || '',
          customer.instructions || '',
          calculatedSubtotal,
          calculatedShipping,
          discount,
          finalAmount,
          'Confirmed (Demo Mode)',
          paymentMethod || 'Cash on Delivery (Demo)'
        ];

        await query(orderInsertSql, orderValues);
      } catch (dbErr) {
        console.warn('PostgreSQL order insert failed, using memory store:', dbErr.message);
      }
    }

    const orderRecord = {
      orderId,
      orderDate: new Date().toISOString(),
      customer,
      items,
      subtotal: calculatedSubtotal,
      shipping: calculatedShipping,
      discount,
      totalAmount: finalAmount,
      status: 'Confirmed (Demo Mode)',
      paymentMethod: paymentMethod || 'Cash on Delivery (Demo)'
    };

    inMemoryOrders.unshift(orderRecord);

    return res.status(201).json(orderRecord);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Server error processing order.' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (pool) {
      try {
        const result = await query('SELECT * FROM orders WHERE order_id = $1 LIMIT 1', [id]);
        if (result && result.rows[0]) {
          return res.json(result.rows[0]);
        }
      } catch (dbErr) {
        console.warn('DB get order error:', dbErr.message);
      }
    }

    const found = inMemoryOrders.find(o => o.orderId === id);
    if (!found) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(found);
  } catch (err) {
    res.status(500).json({ error: 'Server error retrieving order.' });
  }
};
