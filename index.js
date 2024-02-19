const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const router = require('./route/router');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 3000;

server.use(fileUpload());
server.use(cors());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(helmet());
server.use(express.json());
server.use(router);

server.listen(port, () => {
    console.log(`[HOST] http://localhost:${port}/`);
})