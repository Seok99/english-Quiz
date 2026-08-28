// src/config/db.js
const mysql = require('mysql2/promise');
require('dotenv').config(); //.env 불러오기

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,   // 동시에 유지할 최대 커넥션 수
  queueLimit: 0
});

module.exports = pool;