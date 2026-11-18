// backend/api/index.js
// module.exports = require('../src/app');

// backend/api/index.js (임시 진단용)
module.exports = (req, res) => {
  try {
    const app = require('../src/app');
    return app(req, res);
  } catch (err) {
    console.error('STARTUP ERROR:', err);
    res.status(500).send(String(err.stack));
  }
};