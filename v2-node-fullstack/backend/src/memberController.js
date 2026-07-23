const bcrypt = require('bcrypt');
const { authentiactor } = require('otplib');
const memberService = require('../services/memberService');

async function register(req, res) {
    try{
        const { userid, password, email } = req.body;

        //필수값 체크
        if
    }
}