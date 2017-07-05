/**
 * Get mock data Review
 * @param {Request} req
 * @param {Object} req.query
 * @param {Object} req.app
 * @param {Function} req.app.get
 * @param {Number} req.skip
 * @param {Array} req.filters
 * @param {Response} res
 * @param {Function} res.json
 */
exports.review = (req,res) => {
    const helpers = req.app.get('helpers');
    const db = req.app.get('db');
    const limit = req.app.get('constants').REVIEW_PAGE_LIMIT

    const skip = helpers.numberOrNull(req.query.skip);
    const filters = helpers.parseArray(req.query.filters);

    db.review.getReviews(limit, skip, filters)
        .then(reviews => {
            return res.json({
                success: true,
                reviews
            })
        })
    .catch(err => {
        return res.json({
            success: false,
            error: err
        })
    })
}

/**
 * Get general rating
 * @param {Request} req
 * @param {Object} req.app
 * @param {Function} req.app.get
 * @param {Response} res
 * @param {Function} res.json
 * */
exports.average = (req, res) => {
    const helpers = req.app.get('helpers');
    const db = req.app.get('db');

    db.review.getReviews()
        .then(reviews => {
            return helpers.computeAverage(reviews)
        })
        .then(average => {
            return res.json({
                success: true,
                average
            })
        })
        .catch(err => {
            return res.json({
                success: false,
                error: err
            })
        })
};