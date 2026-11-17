const pool = require('../config/db');

//중복체크
async function findByUserid(userid) {
    const {rows} = await pool.query(
        'SELECT * FROM Member Where user_id = $1',
        [userid]
    );
    return rows[0];
}

//새 회원 Insert
async function createMember(userid, hashedPassword, email, otpSecret) {
    const {rows} = await pool.query(
        'INSERT INTO Member (user_id, password, email, otp_secret) VALUES ($1,$2,$3,$4) RETURNING member_id',
        [userid, hashedPassword, email, otpSecret]
    );
    return rows[0].member_id;;
}

async function findById(memberId) {
  console.log('조회하려는 memberId:', memberId, typeof memberId);

  const {rows} = await pool.query(
    'SELECT * FROM Member WHERE member_id = $1',
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