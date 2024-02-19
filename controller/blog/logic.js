const { Operation } = require('./operation');
const { Util } = require('../../util/util');
const axios = require('axios');

class Logic {
    postArticleLogic = (article_text, sampleFile, uploadPath, res) => {

        sampleFile.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);

            res.send('File uploaded!');
        });
        
        //time
        const timeNow = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
        article_text.post_time = timeNow;
        new Operation().postArticleOperation(article_text,res);

        return res.status(400).send("insert pass");
    }

    getTextBlogLogic = (res) => {
        new Operation().getTextBlogOperation(res);
    }

    getVideoBlogLogic = (res) => {
        new Operation().getVideoBlogOperation(res);
    }
}

module.exports = {
    Logic
}