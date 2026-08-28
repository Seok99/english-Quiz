const wordService = require('../services/wordService');

async function getWord(req, res){
    try{
        const words = await wordService.findAll();
        res.status(200).json({
            success: true,
            count: words.length,
            words
        });
    } catch (err){
        console.err(err);
        res.status(500).json({success: false, message: '서버오류가 발생했습니다.'});
    }
}

//단어 단건 조회