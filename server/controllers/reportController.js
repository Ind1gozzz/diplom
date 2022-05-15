const {Report} = require('../models/models')

class ReportControllet {
    async addDeviceReport(req, res) {
        let {deviceId, userId} = req.body
        const report = await Report.create({deviceId: deviceId, userId: userId, date: Date()})
        return res.json(report)
    }

    async fetchUserReport(req, res) {
        let {deviceId, userId} = req.query
        const report = await Report.findAndCountAll({where: {deviceId: deviceId, userId: userId}})
        return res.json(report)
    }
}

module.exports = new ReportControllet()