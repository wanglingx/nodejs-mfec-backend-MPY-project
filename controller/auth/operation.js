const res = require('express/lib/response');
const connection = require('../../database/connection');
class Operation {

    createUserLoginOperation = (userLogin) => {
        let sql = `INSERT INTO user_login
        (
            email, 
            password,
            role
        )
        VALUES
        (
            ?, ?, ?
        )`
        connection.query
            (
                sql,
                [userLogin.email,
                userLogin.password,
                userLogin.role,
                ],
                function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                }
            )
    }

    createUserDetailOperation = (userDetail, res) => {
        let sql = `INSERT INTO user_detail
        (
            login_id, 
            student_id,
            name,
            bio
        )
        VALUES
        (
            ?, ?, ?, ?
        )`
        connection.query
            (
                sql,
                [userDetail.login_id,
                userDetail.student_id,
                userDetail.name,
                userDetail.bio
                ],
                function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.status(201).send({ response: "สมัครสมาชิกสำเร็จ" })
                    }
                }
            )
    }

    getUserIdOperation = (email, res) => {
        let sql = `SELECT * from user_login WHERE email = ?`
        connection.query
            (
                sql,
                [email
                ],
                function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).send({ response: data })
                    }
                }
            )
    }

    getUserLoginOperation = (email, password, res) => {
        let sql = `SELECT *
                    FROM user_login 
                    WHERE email = ? 
                    AND password = ?`
        connection.query(sql, [email, password],
            function (err, result) {
                if (err) {
                    console.log(err);
                }
                else
                    console.log(result);
                res.status(200).send({ response: result })
            })

    }

    updateLastLogin = (newUser, date_time) => {
        console.log(date_time);
        let sql = ` UPDATE user_login 
                    SET last_login = ?
                    WHERE email = ?`
        connection.query(sql, [date_time,newUser.email]),
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
    }
}

module.exports = {
    Operation
}