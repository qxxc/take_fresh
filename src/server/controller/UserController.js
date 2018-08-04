const UserModel = require('../model/UserModel')
const sql = require('./sql')
const UserCtrl = {
    loading: (req, res) => {
        UserModel.test(req, res, sql.select_adminstrator.sql, [req.body.username], sql.select_adminstrator.callback);
    },
    insertActionDate: (req, res) => {
        var obj=req.body;
        UserModel.test(req, res, sql.insertActionDate.sql,
            [obj.A_number, obj.A_adminstrator, obj.A_term, obj.date1, obj.A_status], 
            sql.insertActionDate.callback)
    },
    insertAction: (req, res) => {
        var obj = req.body;
        UserModel.test(req, res, sql.insertAction.sql,
            [obj.A_number, obj.A_adminstrator, obj.A_term, obj.A_status], 
            sql.insertAction.callback)
    },
    beginAction:(req,res)=>{
        UserModel.test(req, res, sql.beginAction.sql,
            [req.body.date1, req.body.A_status, req.body.A_id],
            sql.beginAction.callback)
    },
    selectAction: (req,res)=>{
        UserModel.test(req,res,sql.selectAction.sql,[],sql.selectAction.callback)
    },
    getAction: (req,res)=>{
        UserModel.test(req, res, sql.getAction.sql, [req.body.date, req.body.date], sql.getAction.callback)
    },
    getInter: (req, res) => {
        UserModel.test(req, res, sql.getInter.sql, [req.body.date, req.body.date], sql.getInter.callback)
    },
    deleteInter:(req,res)=>{
        UserModel.test(req, res, sql.deleteInter.sql, [req.body.I_id], sql.deleteInter.callback)
    }
}

module.exports = UserCtrl
