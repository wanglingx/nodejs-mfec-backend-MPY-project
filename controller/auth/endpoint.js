const { Logic } = require('./logic');
const model = require('../../model/auth');

class AuthEndpoint {

    constructor() {
        this.userLogin = model.userLoginModel;
        this.userDetail = model.userDetailModel;
        this.newUser = model.newUserModel;
    }

    registerEndpoint = (req, res) => {
        this.userLogin.email = req.body.email;
        this.userLogin.password = req.body.password;
        this.userDetail.student_id = req.body.student_id;
        this.userDetail.name = req.body.name;
        this.userDetail.bio = "I am " + req.body.name;
        new Logic().registerLogic(this.userLogin, this.userDetail, res);
    }

    getUserIdEndpoint = (req, res) => {
        let email = req.body.email
        new Logic().getUserIdLogic(email, res);
    }

    loginEndpoint = (req, res) => {
        this.newUser.email = req.body.email;
        this.newUser.password = req.body.password;
        new Logic().loginLogic(this.newUser , res);
    }

    getPasswordMaching = (req, res) => {
        let email = req.body.email
        let password = req.body.password
        new Logic().getPasswordMachingLogic(email, password, res);
    }

    verifyEndpoint = (req, res) => {
        let bodyToken = req.body.token;
        let queryToken = req.query.token;
        let headersToken = req.headers['x-access-token'];
        new Logic().verifyLogic(bodyToken, queryToken, headersToken ,this.newUser,res);
    }

}

module.exports = {
    AuthEndpoint
}