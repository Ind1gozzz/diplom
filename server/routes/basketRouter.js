const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.post('/', basketController.addDeviceToBasket)
router.get('/', basketController.fetchUserBasket)
router.post('/delete', basketController.deleteFromBasket)
router.post('/delete/deleteAll', basketController.deleteAllFromBasket)
router.get('/device/isInBasket', basketController.isDeviceInBasket)
router.get('/getsummary', basketController.getSummaryDevices)

module.exports = router;