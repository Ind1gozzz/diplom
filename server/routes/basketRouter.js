const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.post('/', basketController.addDeviceToBasket)
router.post('/delete', basketController.deleteFromBasket)
router.post('/delete/deleteAll', basketController.deleteAllFromBasket)
router.get('/getsummary', basketController.fetchUserBasket)
router.get('/device/isInBasket', basketController.isDeviceInBasket)

module.exports = router;