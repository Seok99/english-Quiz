const jwt = require('jsonwebtoken');

function authenticate(req, res, next){
    //1. Authorization헤더 꺼내기
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({success: false, message:'인증 토큰이 없습니다.'});
    }

    //2. Bearer {token}형식 토근 분리
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({success: false, message: '토근 형식이 올바르지 않습니다.'});
    }
    
    //3. 토큰 검증
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //4. stage체크(OTP대기용 임시 토큰으로 통과제지하기 위함
        if(decoded !== authenticated){
            return res.status(403).json({success: false, message: '완전히 인증되지 않은 토큰입니다.'});
        }
        //5. 검증완료된 사용자 정보 req객체 붙여 전달
        req.member = decoded;
        next();
    } catch (err) {
        return res.json(401).json({success: false, message: '유효하지 않거나 만료된 토큰입니다.'});
    }
}

module.exports = authenticate;