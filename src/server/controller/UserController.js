const UserModel = require('../model/Model')
const sql = require('./UserSql')

const UserCtrl ={
    userResgiter(req,res){
        var data=Object.values(req.body);
        data.unshift('null');
        data.push(0, 0, 0);
        UserModel.test(req, res, sql.userResgiter.sql, data, sql.userResgiter.callback)
    },
    userLogin(req,res){
        UserModel.test(req, res, sql.userLogin.sql, [req.body.u_number], sql.userLogin.callback)
    },
    userEnter(req,res){
        var data = Object.values(req.body);
        UserModel.test(req, res, sql.userEnter.sql, data, sql.userEnter.callback)
    },
    getUserInfo(req,res){
        UserModel.test(req, res, sql.getUserInfo.sql, [req.query.u_number], sql.getUserInfo.callback)
    },
    signIn(req,res){
        UserModel.test(req, res, sql.signIn.sql, [req.body.u_number], sql.signIn.callback)
    }
}

module.exports = UserCtrl