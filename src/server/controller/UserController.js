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
    }
}

module.exports = UserCtrl