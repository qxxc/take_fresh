const router = require('express').Router()
const AdminRouter = require('./AdminRouter')
const InterRouter = require('./InterRouter')
const UserRouter = require('./UserRouter')

router.use('/Admin', AdminRouter)
router.use('/Inter', InterRouter)
router.use('/User', UserRouter)

router.use('/*', (req, res) => {
    res.status(404).json('【SERVER ERROR】Interface Not Found !')
})

module.exports = router
