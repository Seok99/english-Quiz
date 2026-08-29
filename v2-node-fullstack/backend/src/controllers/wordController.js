const wordService = require('../services/wordService');

//단어 목록 조회
async function getWords(req, res){
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
async function getWordById(req, res){
    try{
        const { wordId } = req.params;
        const word = await wordService.findById(wordId);

        if (!word){
            return res.status(404).json({ success : false, message: '존재하지않는 단어입니다.'});
        }

        res.status(200).json({
            success: true,
            word
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '서버오류가 발생했습니다.'});
    }
}

module.exports = {
    getWords,
    getWordById
}