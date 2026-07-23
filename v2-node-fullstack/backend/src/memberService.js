const pool = require('../config/db');

//중복체크
async function findByUserid(userid) {
    const [rows] = await pool.query(
        'SELECT * FROM Member Where userid = ?',
        [userid]
    );
    return rows[0];
}

//새 회원 Insert
async function createMember(userid, hashedPassword, email, otpSecret) {
    const [result] = await pool.query(
        'INSERT INTO Member (userid, password, email, otp_secret VALUES (?, ?, ?, ?)',
        [userid, hashedPassword, email, otpSecret]
    );
    return result.insertId;
}

module.exports = {
    findByUserid,
    createMember
};