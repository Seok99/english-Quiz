// src/config/db.js
const { Pool } = require('pg');
require('dotenv').config(); // .env 불러오기

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Supabase는 SSL 필수
  max: 3,                             // 서버리스라 작게 유지
});

module.exports = pool;