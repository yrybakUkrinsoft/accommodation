const DATE_SORT_CONST = require('../../constants').DATE_SORT_CONST

/**
 * Get mock data Review
 * @param {Request} req
 * @param {Response} res
 */
exports.review = (req,res) => {
    let filters = req.query.filters;
    try{
        filters = JSON.parse(filters);
    } catch (e){
        filters = [];
    } finally{
        filters = Array.isArray(filters) ? filters : [];
    }

    let mockData = req.app.get('mock');
    let helpers = req.app.get('helpers');

    new Promise((resolve, reject) => {
        //filter by filters
    })
    .then(data => {
        // sort data if need
        mockData = helpers.sort.sortBy(mockData, DATE_SORT_CONST.TRAVEL);
    })
        .then(data => {
            return res.json({
                success: true,
                review: mockData
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
    let helpers = req.app.get('helpers');
    mockData = helpers.sort.sortBy(mockData, DATE_SORT_CONST.TRAVEL);
    res.json({
        success: true,
        value: mockData
    })
};