// src/app.js
const express = require('express');
const cors = require('cors');
//
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// 테스트용 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: '서버가 정상적으로 실행 중입니다.' });
});ㅌ

module.exports = app; 