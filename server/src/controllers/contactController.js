import { query, pool } from '../config/db.js';

export const handleContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (pool) {
      try {
        await query(
          'INSERT INTO contact_inquiries (name, email, subject, message) VALUES ($1, $2, $3, $4)',
          [name, email, subject, message]
        );
      } catch (dbErr) {
        console.warn('DB contact inquiry insert failed:', dbErr.message);
      }
    }

    res.json({
      success: true,
      message: 'Thank you! Your message has been received by ARTIVA Studio.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error saving inquiry.' });
  }
};
