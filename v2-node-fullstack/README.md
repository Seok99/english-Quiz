node사용한 영어퀴즈 웹페이지

진행도
1. DB구성 -> mysql사용해 설계
2. DB 커넥션 풀 제작
3. 회원가입/로그인(OTP방식) API설계
    - 회원가입 (bcrypt 해싱 + otp_secret 생성)
    - OTP 등록용 QR 발급
    - 로그인 1단계 (id/pw 검증 → 임시 토큰)
    - 로그인 2단계 (OTP 검증 → 최종 JWT 발급)
4. 