const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.post('/', basketController.addDeviceToBasket)
router.get('/', basketController.fetchUserBasket)

module.exports = router;