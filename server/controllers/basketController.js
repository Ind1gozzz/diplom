const {BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError');

class BasketController
{
    async addDevice(req, res)
    {
        const {basketId, deviceId} = req.body
        const basketDevice = await BasketDevice.create({basketId, deviceId})
        return res.json(basketDevice)
    }

    async getAll(req, res)
    {
        const basketDevice = await BasketDevice
    }
}