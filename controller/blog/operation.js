const connection = require('../../database/connection');

class Operation {
    postArticleOperation = (article_text, res) => {
        console.log(article_text.image);
        let sql = `
        INSERT INTO article_text 
        (   id,
            title,
            description,
            author_name,
            image,
            url,
            post_time
        ) 
        VALUES (?,?,?,?,LOAD_FILE(?),?,?)`
        connection.query(sql,[
            article_text.id,
            article_text.title,
            article_text.description,
            article_text.author_name,
            article_text.image,
            article_text.url,
            article_text.post_time],
            function (err) {
                if (err) {
                    console.log(err);
                }
            })
    }

    getTextBlogOperation = (res) => {
        let sql = `
        SELECT * FROM article_text`
        connection.query(sql,
            function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).send({ response: data });
                }
        })
    }

    getVideoBlogOperation = (res) => {
        let sql = `
        SELECT * FROM article_video`
        connection.query(sql,
            function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).send({ response: data });
                }
            })
    }
}

module.exports = {
    Operation
}