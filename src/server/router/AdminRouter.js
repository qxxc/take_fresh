const AdminRouter = require('express').Router()
const AdminController = require('../controller/AdminController')

AdminRouter
    .post('/select_admin', (req, res) => {
        AdminController.loading(req, res)
    })
    .post('/get_admin_info',(req,res)=>{
        AdminController.getAdminInfo(req,res)
    })
    .post('/insert_action', (req, res) => {
        if(req.body.date1){
            AdminController.insertActionDate(req, res)
        }else{
            AdminController.insertAction(req, res)
        }
    })
    .post('/update_admin_info',(req,res)=>{
        AdminController.updateAdminInfo(req,res)
    })
    .get('/select_action', (req, res) => {
        AdminController.selectAction(req, res)
    })
    .post('/get_action', (req, res) => {
        AdminController.getAction(req, res)
    })
    .post('/begin_action',(req,res)=>{
        AdminController.beginAction(req,res);
    })
    .post('/end_action', (req, res) => {
        AdminController.endAction(req, res);
    })
    .get('/get_inter',(req,res)=>{
        AdminController.getInter(req,res)
    })
    .get('/get_inter_apply',(req,res)=>{
        AdminController.getInterApply(req,res);
    })
    .post('/delete_inter', (req, res) => {
        AdminController.deleteInter(req, res)
    })
    .post('/insert_admin', (req, res) => {
        AdminController.insertAdmin(req, res)
    })
    .post('/chang_I_status', (req, res) => {
        AdminController.changIStatus(req, res)
    })
    .post('/get_allUser',(req,res)=>{
        AdminController.getAllUser(req,res);
    })
    .post((req, res) => {
        res.send('post')
    })
    .put((req, res) => {
        res.send('put')
    })

module.exports = AdminRouter
