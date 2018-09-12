const InterModel = require('../model/Model')
const sql = require('./InterSql')


const InterCtrl={
    getUserWaiting(req,res){
        InterModel.test(req,res,sql.getUserWaiting.sql,[],sql.getUserWaiting.callback);
    },
    getUserResult(req,res){
        InterModel.test(req, res, sql.getUserResult.sql,[req.query.u_number],sql.getUserResult.callback);
    },
    changeUserStatus(req,res){
        InterModel.test(req, res, sql.changeUserStatus.sql, [req.body.u_number], sql.changeUserStatus.callback);
    },
    updateUserResult(req,res){
        req.body.val.push(req.body.u_number);
        var arr = req.body.val;
        var status=2
        if(req.body.val[0]=='r_third_base'){
            status=4;
        }
        console.log(status);
        var sql_arr = [arr[1], arr[3], arr[5], arr[6]]
        InterModel.test(req, res, 'update result set '+arr[0]+'=?,'+arr[2]+'=?,'+arr[4]+'=?'+'where r_number=?', sql_arr, sql.updateUserResult.callback);
        InterModel.test(req, res, 'update user set u_count=u_count+1,u_status=? where u_number=?',[status,req.body.u_number],function(req,res,data){
            res.send('1')
        })
    }
}

module.exports=InterCtrl