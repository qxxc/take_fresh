const AdminModel = require('../model/Model')
const sql = require('./AdminSql')
const AdminCtrl = {
    loading: (req, res) => {
        AdminModel.test(req, res, sql.select_adminstrator.sql, [req.body.username], sql.select_adminstrator.callback);
    },
    insertActionDate: (req, res) => {
        var obj=req.body;
        AdminModel.test(req, res, sql.insertActionDate.sql,
            [obj.A_number, obj.A_adminstrator, obj.A_term, obj.date1, obj.A_status], 
            sql.insertActionDate.callback)
    },
    insertAction: (req, res) => {
        var obj = req.body;
        AdminModel.test(req, res, sql.insertAction.sql,
            [obj.A_number, obj.A_adminstrator, obj.A_term, obj.A_status], 
            sql.insertAction.callback)
    },
    getAdminInfo:(req,res)=>{
        AdminModel.test(req, res, sql.getAdminInfo.sql, [req.body.id], sql.getAdminInfo.callback);
    },
    updateAdminInfo:(req,res)=>{
        var sql ='update adminstrator set ';
        var array=[];
        var count=0;
        for (var i in req.body) {
            if(req.body[i]){
                count++
            }
        }
        for (i in req.body) {
            if(i!='a_id'){
                sql+=i+'=?,'
            }
            array.push(req.body[i])
        }
        sql = sql.substring(0, sql.length - 1)
        sql+=' where a_id=?'
        AdminModel.test(req,res,sql,array,(req,res,data)=>{
            res.send('1')
        })
    },
    beginAction:(req,res)=>{
        AdminModel.test(req, res, sql.beginAction.sql,
            [req.body.date1, req.body.A_status, req.body.A_id],
            sql.beginAction.callback)
    },
    endAction: (req, res) => {
        AdminModel.test(req, res, sql.endAction.sql,
            [req.body.date1, req.body.A_status, req.body.A_id],
            sql.endAction.callback)
    },
    getAllUser: (req, res) => {
        AdminModel.test(req, res, sql.getAllUser.sql,[req.body.trem],
            // [req.body.date1, req.body.A_status, req.body.A_id],
            sql.getAllUser.callback)
    },
    changIStatus:(req,res)=>{
        var array=req.body;
        var callback = sql.changIStatus.callback(req, res);
        array.forEach(row=>{
            AdminModel.test(req, res, sql.changIStatus.sql, [row.status, row.id], callback )
        })
        
    },
    insertAdmin:(req,res)=>{
        if (req.body.term<2018){
            res.send('填写正确的学年')
        }else{
            async function inherit(req,res){
                await AdminModel.test(req, res, sql.changaStatus.sql, [req.body.a_id], sql.changaStatus.callback)
                await AdminModel.test(req, res, sql.insertAdmin.sql, [req.body.num, req.body.pass, req.body.name, req.body.term, req.body.tel], sql.insertAdmin.callback)
            }
            inherit(req,res).then(val=>{console.log(val)}).catch(err=>{console.log(err)});
        }
    },
    getInterApply:(req,res)=>{
        AdminModel.test(req, res, sql.getInterApply.sql, [], sql.getInterApply.callback)
    },
    selectAction: (req,res)=>{
        AdminModel.test(req,res,sql.selectAction.sql,[],sql.selectAction.callback)
    },
    getAction: (req,res)=>{
        AdminModel.test(req, res, sql.getAction.sql, [req.body.date, req.body.date], sql.getAction.callback)
    },
    getInter: (req, res) => {
        AdminModel.test(req, res, sql.getInter.sql, [req.body.date, req.body.date], sql.getInter.callback)
    },
    deleteInter:(req,res)=>{
        AdminModel.test(req, res, sql.deleteInter.sql, [req.body.I_id], sql.deleteInter.callback)
    }
}

module.exports = AdminCtrl
