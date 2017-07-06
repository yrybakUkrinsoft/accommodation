/**
 * Name: review class
 */

module.exports = class Review {
    constructor(pg) {
        this.postgres = pg;
    }

    /**
     * get user history count
     * @param {string} userID
     * @returns {Promise}
     */
    getReviews(limit, skip, filters) {
        const self = this;
        const Promise = this.postgres.get('Promise');
        const constants = this.postgres.get('constants')

        return new Promise((resolve, reject) => {
            const Review = self.postgres.getModel('Review');
            const searchObj = {
                attributes: {exclude: ['id']},
                include: [
                    {
                        attributes: {exclude: ['id', 'reviewId']},
                        model: self.postgres.getModel('Review_rating'),
                    },
                    {
                        attributes:['locale', 'text'],
                        model: self.postgres.getModel('Review_text'),
                    },
                    {
                        attributes:['locale', 'title'],
                        model: self.postgres.getModel('Review_title'),
                    }
                ],
                where: {}
            };

            // add filters
            let traveledWithFilter = filters && filters[0] ? filters[0].toUpperCase() : null;
            let traveledWith = constants.TRAVELED_WITH.indexOf(traveledWithFilter);
            if(traveledWith !== -1){
                searchObj.where.traveledWith = traveledWith;
            }

            // add limits
            if (skip && skip > 0) searchObj.offset = skip;
            if (limit && limit > 0) searchObj.limit = limit;
            Review.findAll(searchObj)
                .then(result => {
                    // normalize result
                    const normalizedData= JSON.parse(JSON.stringify(result));
                    return normalizedData;
                })
                .then(reviews => {
                    return reviews.map(review => {
                        return Object.assign(review,{
                            locale: constants.LOCALE[review.locale],
                            traveledWith: constants.TRAVELED_WITH[review.traveledWith]
                        })
                    })
                })
                .then(resolve)
                .catch(reject)
        })
    }
}

























