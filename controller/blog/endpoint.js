const { Logic } = require('./logic');
const model = require('../../model/blog');

class BlogEndpoint {
   constructor() {
      this.article_text = model.article_text;
   }

   postArticleEndpoint = async (req, res) => {
      let sampleFile;
      let uploadPath;

      if (!req.files || Object.keys(req.files).length === 0) {
         return res.status(400).send('No files were uploaded.');
      }
      sampleFile = req.files.sampleFile;
      uploadPath = __dirname + '../blog/image' + sampleFile;

      this.article_text.id = req.body.id;
      this.article_text.title = req.body.title;
      this.article_text.description = req.body.description;
      this.article_text.author_name = req.body.author_name;
      this.article_text.url = req.body.url;
      new Logic().postArticleLogic(this.article_text,sampleFile,uploadPath, res);
   }

   getTextBlogEndpoint = (req, res) => {
      new Logic().getTextBlogLogic(res);
   }

   getVideoBlogEndpoint = (req, res) => {
      new Logic().getVideoBlogLogic(res);
   }
}

module.exports = {
   BlogEndpoint
}