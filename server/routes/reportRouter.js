const Router = require('express')
const router = new Router()
const ReportControllet = require('../controllers/reportController')

router.post('/', ReportControllet.addDeviceReport)
router.get('/', ReportControllet.fetchUserReport)

module.exports = router