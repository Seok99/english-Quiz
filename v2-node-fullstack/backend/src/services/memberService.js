const pool = require('../config/db');

//중복체크
async function findByUserid(userid) {
    const [rows] = await pool.query(
        'SELECT * FROM Member Where user_id = ?',
        [userid]
    );
    return rows[0];
}

//새 회원 Insert
async function createMember(userid, hashedPassword, email, otpSecret) {
    const [result] = await pool.query(
        'INSERT INTO Member (user_id, password, email, otp_secret) VALUES (?, ?, ?, ?)',
        [userid, hashedPassword, email, otpSecret]
    );
    return result.insertId;
}

async function findById(memberId) {
  console.log('조회하려는 memberId:', memberId, typeof memberId);

  const [rows] = await pool.query(
    'SELECT * FROM Member WHERE member_id = ?',
    [memberId]
  );

  console.log('조회 결과:', rows);

  return rows[0];
}

//otp
module.exports = {
    findByUserid,
    createMember,
    findById
};