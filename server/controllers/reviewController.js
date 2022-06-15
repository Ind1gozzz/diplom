const {Review} = require('../models/models')

class ReviewController {
    async create(req, res) {
        const {username, reviewtext, userId, deviceId } = req.body
        const review = await Review.create({username: username, reviewtext: reviewtext, userId: userId, deviceId: deviceId})
        return res.json(review)
    }

    async fetchReview(req, res) {
        let {deviceId} = req.query
        const review = await Review.findAll({where: {deviceId: deviceId}})
        return res.json(review)
    }
}

module.exports = new ReviewController()