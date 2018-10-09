const UserRouter = require('express').Router()
const UserController = require('../controller/UserController')

UserRouter
    .post('/user_resgiter',(req,res)=>{
        UserController.userResgiter(req,res)
    })
    .post('/user_login',(req,res)=>{
        UserController.userLogin(req,res)
    })
    .post('/user_enter',(req,res)=>{
        UserController.userEnter(req,res)
    })
    .get('/get_user_info',(req,res)=>{
        UserController.getUserInfo(req,res)
    })
    .post('/sign_in',(req,res)=>{
        UserController.signIn(req,res)
    })
module.exports=UserRouter