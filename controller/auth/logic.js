const { Operation } = require('./operation');
const { Util } = require('../../util/util');
const validator = require("email-validator");
const passwordValidator = require('password-validator');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwtKey = "my_secret_key"
    //const jwtExpirySeconds = 300

var schema = new passwordValidator();

class Logic {

    registerLogic = async(userLogin, userDetail, res) => {
        userLogin.email = userLogin.email.trim();

        if (!validator.validate(userLogin.email)) {
            return res.status(400).send({ response: "รูปแบบอีเมลไม่ถูกต้อง" });
        }

        let response = await axios.post('http://localhost:3000/getUserId', { email: userLogin.email });
        if (response.data.response.length > 0) {
            return res.status(400).send({ response: "อีเมลนี้ถูกใช้งานเเล้ว" })
        }

        schema
            .is().min(8)
            .is().max(25)
            .has().uppercase()
            .has().lowercase()

        if (!schema.validate(userLogin.password)) {
            return res.status(400).send({ response: "รูปแบบรหัสผ่านไม่ถูกต้อง" });
        }

        let hash = new Util().encryptPassword(userLogin.password);
        userLogin.password = new Util().hashBindingSalt(hash);

        new Operation().createUserLoginOperation(userLogin);

        response = await axios.post('http://localhost:3000/getUserId', { email: userLogin.email });
        let responseLength = parseInt(response.data.response.length)

        if (responseLength == 1) {
            userDetail.login_id = response.data.response[0].id
        } else {
            return res.status(400).send({ response: "อีเมลนี้ถูกใช้งานเเล้ว" })
        }

        new Operation().createUserDetailOperation(userDetail, res);
    }

    getUserIdLogic = (email, res) => {
        new Operation().getUserIdOperation(email, res);
    }

    loginLogic = async(newUser, res) => {

        //element filed empty
        if (!newUser.email) {
            return res.status(400).send({ response: "กรุณากรอกอีเมล" });
        }
        if (!newUser.password) {
            return res.status(400).send({ response: "กรุณากรอกรหัสผ่าน" });
        }

        //hashing password
        let hash = new Util().encryptPassword(newUser.password);
        newUser.password = new Util().hashBindingSalt(hash);

        //find data on database
        let response = await axios.post('http://localhost:3000/getPasswordMaching', { email: newUser.email, password: newUser.password });
        let resLength = parseInt(response.data.response.length)

        //validaton password and email matching 
        if (resLength == 0) {
            return res.status(400).send({ response: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
        }

        //set another data on new User after login
        newUser.user_id = response.data.response[0].id;
        newUser.role = response.data.response[0].role;

        //create token
        const token = jwt.sign({ user_id: newUser.user_id, email: newUser.email }, jwtKey, {
            algorithm: "HS512",
            expiresIn: "1m"
        })

        //save token
        newUser.token = token;
        console.log(newUser.token);

        //update last_login
        const timeNow = new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });
        newUser.last_login = timeNow;
        console.log(timeNow);

        new Operation().updateLastLogin(newUser, timeNow);
        return res.status(200).send({ response: newUser });

    }

    getPasswordMachingLogic = (email, password, res) => {
        new Operation().getUserLoginOperation(email, password, res);
    }

    verifyLogic = (bodyToken, queryToken, headersToken, newUser, res) => {
        const token = bodyToken || queryToken || headersToken;

        if (!token || token !== newUser.token) {
            return res.status(400).send({ response: "A token were require to authentication " })
        } else {
            var decoded = jwt.verify(token, jwtKey);
            newUser = decoded;
            return res.status(200).send("Welcome back");
            //return res.status(200).send(newUser)
        }
    }
}

module.exports = {
    Logic
}