import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

let pool = null;
let isConnected = false;

// Only configure pool if environment variables are provided
if (process.env.DB_NAME && process.env.DB_USER) {
  try {
    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });

    pool.on('error', (err) => {
      console.warn('Unexpected error on idle PostgreSQL client:', err.message);
      isConnected = false;
    });
  } catch (err) {
    console.warn('PostgreSQL pool creation failed:', err.message);
  }
}

export const query = async (text, params) => {
  if (!pool) return null;
  return pool.query(text, params);
};

export const checkDatabaseConnection = async () => {
  if (!pool) return false;
  try {
    const res = await pool.query('SELECT NOW()');
    isConnected = !!res.rows[0];
    return isConnected;
  } catch (err) {
    isConnected = false;
    return false;
  }
};

export { pool, isConnected };
