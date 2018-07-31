const _connect = require('../config/mysql')

const UserModel = {
    test:function(req,res,sql,Array){
        _connect.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
            } else {
                connection.query(sql,Array,function (err, data) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(data.a_number);
                        if (req.body.username==data.a_number&&req.body.password==data.a_password){
                            res.send('1');
                        }
                        else{
                            res.send('0');
                        }
                        connection.release();
                    }
                })
            }
        })
    }
}

module.exports = UserModel
