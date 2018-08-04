const _connect = require('../config/mysql')

const UserModel = {
    test:function(req,res,sql,Array,callback){
        _connect.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            } else {
                connection.query(sql,Array,function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        callback(req,res,data);
                        connection.release();
                    }
                })
            }
        })
    }
}

module.exports = UserModel
