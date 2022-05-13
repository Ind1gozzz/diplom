const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.post('/', basketController.addDeviceToBasket)
router.get('/', basketController.fetchUserBasket)
router.get('/device/isInBasket', basketController.isDeviceInBasket)
router.post('/delete', basketController.deleteFromBasket)

module.exports = router;