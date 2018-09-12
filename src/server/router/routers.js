const router = require('express').Router()
const AdminRouter = require('./AdminRouter')
const InterRouter = require('./InterRouter')

router.use('/Admin', AdminRouter)
router.use('/Inter', InterRouter)

router.use('/*', (req, res) => {
    res.status(404).json('【SERVER ERROR】Interface Not Found !')
})

module.exports = router
