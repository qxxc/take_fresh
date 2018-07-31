const UserModel = require('../model/UserModel')
const UserCtrl = {
    select_adminstrator: (req, res) => {
        UserModel.test(req, res,
            'select a_number,a_password,a_name from adminstrator where a_number=?', [req.body.username])
    }
}

module.exports = UserCtrl
