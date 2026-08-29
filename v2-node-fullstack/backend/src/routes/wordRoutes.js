const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

router.get('/', wordController.getWords);
router.get('/:wordId', wordController.getWordById);

module.exports = router;