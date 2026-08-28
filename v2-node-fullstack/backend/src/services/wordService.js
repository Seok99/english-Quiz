const pool = require('../config/db');

//전체단어 목록 조회
async function findAll() {
    const[ rows ] = await pool.query(
        'SELECT * FROM Word ORDER BY word_id DESC'
    );
    return rows;
}

//단어 단건 조회
async function findById(wordId) {
    const[ rows ] = await pool.query(
        'SELECT * FROM Word WHERE word_id = ?',
        [wordId]
    );
    return rows[0];
}

module.exports = {
    findAll,
    findById
};
