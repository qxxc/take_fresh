const router = require('express').Router()
const AdminRouter = require('./AdminRouter')

router.use('/Admin', AdminRouter)

router.use('/*', (req, res) => {
    res.status(404).json('【SERVER ERROR】Interface Not Found !')
})

module.exports = router
