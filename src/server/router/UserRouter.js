const UserRouter = require('express').Router()
const UserController = require('../controller/UserController')

UserRouter
    .post('/select_admin', (req, res) => {
        UserController.loading(req, res)
    })
    .post('/get_admin_info',(req,res)=>{
        UserController.getAdminInfo(req,res)
    })
    .post('/insert_action', (req, res) => {
        if(req.body.date1){
            UserController.insertActionDate(req, res)
        }else{
            UserController.insertAction(req, res)
        }
    })
    .post('/update_admin_info',(req,res)=>{
        UserController.updateAdminInfo(req,res)
    })
    .get('/select_action', (req, res) => {
        UserController.selectAction(req, res)
    })
    .post('/get_action', (req, res) => {
        UserController.getAction(req, res)
    })
    .post('/begin_action',(req,res)=>{
        UserController.beginAction(req,res);
    })
    .post('/end_action', (req, res) => {
        UserController.endAction(req, res);
    })
    .get('/get_inter',(req,res)=>{
        UserController.getInter(req,res)
    })
    .get('/get_inter_apply',(req,res)=>{
        UserController.getInterApply(req,res);
    })
    .post('/delete_inter', (req, res) => {
        UserController.deleteInter(req, res)
    })
    .post('/insert_admin', (req, res) => {
        UserController.insertAdmin(req, res)
    })
    .post('/chang_I_status', (req, res) => {
        UserController.changIStatus(req, res)
    })
    .post('/get_allUser',(req,res)=>{
        UserController.getAllUser(req,res);
    })
    .post((req, res) => {
        res.send('post')
    })
    .put((req, res) => {
        res.send('put')
    })

module.exports = UserRouter
