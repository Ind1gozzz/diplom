const {Report, User, Brand, Device, Type, Basket} = require('../models/models')

class ReportControllet {
    async addDeviceReport(req, res) {
        let {deviceId, userId} = req.body
        const report = await Report.create({deviceId: deviceId, userId: userId, date: Date()})
        return res.json(report)
    }

    async fetchUserReport(req, res) {
        let {deviceId, userId, typeId} = req.query
        let report
        if (!deviceId && !userId) {
            report = await Report.findAndCountAll({include: [{model: User}, {model: Device}]})
        }
        if (!deviceId && userId) {
            report = await Report.findAndCountAll({where: {userId: userId}, include: [{model: User, attributes:['id','email']}, {model: Device}]})
        }
        if (deviceId && !userId) {
            report = await Report.findAndCountAll({where: {deviceId: deviceId}, include: [{model: User, attributes:['id','email']}, {model: Device}]})
        }
        if (deviceId && userId) {
            report = await Report.findAndCountAll({where: {deviceId: deviceId, userId: userId}, include: [{model: User, attributes:['id','email']}, {model: Device}]})
        }

        if (typeId) {
            if (!deviceId && !userId) {
                report = await Report.findAndCountAll({include: [{model: User}, {model: Device, where: {typeId: typeId}}]})
            }
            if (!deviceId && userId) {
                report = await Report.findAndCountAll({where: {userId: userId}, include: [{model: User, attributes:['id','email']}, {model: Device, where: {typeId: typeId}}]})
            }
            if (deviceId && !userId) {
                report = await Report.findAndCountAll({where: {deviceId: deviceId}, include: [{model: User, attributes:['id','email']}, {model: Device, where: {typeId: typeId}}]})
            }
            if (deviceId && userId) {
                report = await Report.findAndCountAll({where: {deviceId: deviceId}, include: [{model: User, attributes:['id','email']}, {model: Device, where: {typeId: typeId}}]})
            }
        }

        return res.json(report)
    }
}

module.exports = new ReportControllet()