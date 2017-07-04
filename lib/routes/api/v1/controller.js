/**
 * Get mock data Review
 * @param {Request} req
 * @param {Object} req.query
 * @param {Number} req.skip
 * @param {Array} req.filters
 * @param {Response} res
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
 * @param {Response} res
 * */
exports.general = (req, res) => {
    let mockData = req.app.get('mock');
    let DATE_SORT_CONST = req.app.get('constants').DATE_SORT_CONST;
    let helpers = req.app.get('helpers');
    mockData = helpers.sort.sortBy(mockData, DATE_SORT_CONST.TRAVEL);
    res.json({
        success: true,
        value: mockData
    })
};