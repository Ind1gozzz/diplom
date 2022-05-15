const {BasketDevice, Device} = require('../models/models')
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
        let {BasketID} = req.query
        const basketDevice = await BasketDevice.findAll({where: {basketId: BasketID}})
        return res.json(basketDevice)
    }
    
    async isDeviceInBasket(req, res) {
        let {deviceID, basketID} = req.query
        const device = await BasketDevice.findAll({where: {basketId: basketID, deviceId: deviceID}})
        return res.json(device.length)
    }

    async deleteFromBasket(req, res) {
        let {deviceID, basketID} = req.body
        const device = await BasketDevice.destroy({where: {basketId: basketID, deviceId: deviceID}})
        return res.json(device)
    }

    async deleteAllFromBasket(req, res) {
        let {basketId} = req.body
        const basket = await BasketDevice.destroy({where: {basketId: basketId}})
        return res.json(basket)
    }

    async getSummaryDevices(req, res) {
        let {basketId} = req.query
        const basket = await BasketDevice.findAndCountAll({
            where: {basketId: basketId},
        })
        return res.json(basket)
    }
}

module.exports = new BasketController()