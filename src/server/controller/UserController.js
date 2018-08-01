const UserModel = require('../model/UserModel')
const sql = require('./sql')
const UserCtrl = {
    select_adminstrator: (req, res) => {
        function callback(data) {
            if (req.body.username == data.a_number && req.body.password == data.a_password) {
                res.send('1');
            }
            else {
                res.send('0');
            }
        }
        UserModel.test(req, res,sql.select_adminstrator.sql, [req.body.username],callback)
    }
}

module.exports = UserCtrl
