USE english_quiz;
ALTER TABLE Member ADD COLUMN otp_secret VARCHAR(255) NULL;
SELECT * FROM Member;