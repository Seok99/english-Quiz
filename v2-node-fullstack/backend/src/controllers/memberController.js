const bcrypt = require('bcrypt');
const { generateSecret, generateURI } = require('otplib');
const memberService = require('../services/memberService');
const qrcode = require('qrcode');
const { authPlugins } = require('mysql2');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try{
        const { userid, password, email } = req.body;

        //필수값 체크
        if (!userid || !password || !email) {
            return res.status(400).json({ success : false, message : "필수 항목 누락되었습니다."});
        }

        //중복값 체크
        const existingMember = await memberService.findByUserid(userid);
        if(existingMember) {
            return res.status(409).json({ success : false, message : "이미 존재하는 아이디입니다."});
        }

        //비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);

        //OTP Secret 생성
        const otpSecret = generateSecret();

        //DB저장
        const memberId = await memberService.createMember(userid, hashedPassword, email, otpSecret);

        //응답
        res.status(201).json({
            success : true,
            message : '회원가입 완료되었습니다.',
            memberId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success : false, message : '서버 오류가 발생했습니다.'});
    }
}

//QR Code
async function getOtpSetup(req, res) {
    try {
        const { memberId } = req.params;
        //1. 회원조회
        const member = await memberService.findById(memberId);
        if(!member) {
            return res.status(404).json({success: false, message:'존재하지않는 회원입니다.'});
        }

        //2. Otpauth URL생성
        const otpauthUrl = generateURI({
            issuer: 'EnglishQuizApp',
            label: member.user_id,
            secret: member.otp_secret
        });

        //3. otpauth URL -> QR코드(base 64) 변환
        const qrImageUrl = await qrcode.toDataURL(otpauthUrl);

        //4. 응답 (base64이미지 문자열 그대로 반환)
        res.status(200).json ({
            success: true,
            qrImage: qrImageUrl
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.'});
    }
}

async function login(req, res){
    try{
        const { userid, password } = req.body;

        //1. 필수값 체크
        if (!userid || !password) {
            return res.status(400).json({success : false, message : '아이디와 비밀번호를 입력해주세요'});
        }
        //2. 회원조회
        const member = await memberService.findByUserid(userid);
        if (!member) {
            return res.status(401).json({success : false, message : '아이디 또는 비밀번호가 일치하지않습니다.'});
        }
        //3. 비밀번호 검증
        const isPasswordValid = await bcrypt.compare(password, member.password);
        if (!isPasswordValid){
            return res.status(401).json({success : false, message : '아이디 또는 비밀번호가 일치하지않습니다.'});
        }
        //4. 임시토큰 발급 (OTP 대기 상태)
        const tempToken = jwt.sign(
            {memberId : member.member_id, stage: 'otp_pending'},
            process.env.JWT_SECRET,
            { expiresIn: '5m' }
        );

        //5. 응답
        res.status(200).json({
            success : true,
            message: 'OTP 인증이 필요합니다',
            tempToken
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
}

module.exports = {register, getOtpSetup, login};