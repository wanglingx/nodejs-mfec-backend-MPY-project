const express = require('express');
const router = express.Router();
const { AuthEndpoint } = require('../controller/auth/endpoint');
const { BlogEndpoint } = require('../controller/blog/endpoint');

router.post('/register', new AuthEndpoint().registerEndpoint);

router.post('/getUserId', new AuthEndpoint().getUserIdEndpoint);

router.post('/login', new AuthEndpoint().loginEndpoint);

router.post('/getPasswordMaching', new AuthEndpoint().getPasswordMaching);

router.get('/verify', new AuthEndpoint().verifyEndpoint);

router.post('/postArticle', new BlogEndpoint().postArticleEndpoint);

router.get('/getTextBlog', new BlogEndpoint().getTextBlogEndpoint);

router.get('/getVideoBlog', new BlogEndpoint().getVideoBlogEndpoint);

module.exports = router;