const UserRouter = require('express').Router()
const UserController = require('../controller/UserController')

UserRouter
    .post('/user_resgiter',(req,res)=>{
        UserController.userResgiter(req,res)
    })
    .post('/user_login',(req,res)=>{
        UserController.userLogin(req,res)
    })
module.exports=UserRouter