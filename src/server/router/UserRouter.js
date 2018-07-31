const UserRouter = require('express').Router()
const UserController = require('../controller/UserController')

UserRouter
    .post('/select_admin', (req, res) => {
        UserController.select_adminstrator(req, res)
    })
    .post((req, res) => {
        res.send('post')
    })
    .put((req, res) => {
        res.send('put')
    })

module.exports = UserRouter
