const UserRouter = require('express').Router()
const UserController = require('../controller/UserController')

UserRouter
    .post('/select_admin', (req, res) => {
        UserController.loading(req, res)
    })
    .post('/insert_action', (req, res) => {
        if(req.body.date1){
            UserController.insertActionDate(req, res)
        }else{
            UserController.insertAction(req, res)
        }
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
    .get('/get_inter',(req,res)=>{
        UserController.getInter(req,res)
    })
    .post('/delete_inter', (req, res) => {
        UserController.deleteInter(req, res)
    })
    .post((req, res) => {
        res.send('post')
    })
    .put((req, res) => {
        res.send('put')
    })

module.exports = UserRouter
