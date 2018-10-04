const InterRouter = require('express').Router()
const InterController = require('../controller/InterController')



InterRouter
    .get('/get_user_waiting',(req,res)=>{
        InterController.getUserWaiting(req,res)
    })
    .get('/get_user_result', (req, res) => {
        InterController.getUserResult(req, res)
    })
    .get('/get_interview_result',(req,res)=>{
        InterController.getInterviewResult(req,res)
    })
    .post('/change_user_status',(req,res)=>{
        InterController.changeUserStatus(req,res)
    })
    .post('/update_user_result',(req,res)=>{
        InterController.updateUserResult(req,res)
    })
    .post('/goBack_user_status',(req,res)=>{
        InterController.goBackUserStatus(req,res)
    })
    .post('/login_inter',(req,res)=>{
        InterController.loginInter(req,res)
    })
    .post('/register_submit',(req,res)=>{
        InterController.registerSubmit(req,res)
    })
    .post('/allow_user',(req,res)=>{
        InterController.allowUser(req,res)
    })
module.exports=InterRouter