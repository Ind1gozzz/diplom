const {BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController
{
    async addDeviceToBasket(req, res)
    {
        const {basketId, deviceId} = req.body
        const basketDevice = await BasketDevice.create({basketId, deviceId})
        return res.json(basketDevice)
    }

    async fetchUserBasket(req, res)
    {
        const {basketId} = req.body
        const basketDevice = await BasketDevice.findAll({where: {basketId}})
        return res.json(basketDevice)
    }
}

module.exports = new BasketController();