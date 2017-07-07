/**
 * Name: review class
 */

module.exports = class Review {
    constructor(pg) {
        this.postgres = pg;
    }

    /**
     * get user history count
     * @param {number} limit
     * @param {number} skip
     * @param {Object} filters
     * @returns {Promise}
     */
    getReviews(limit, skip, filters) {
        const self = this;
        const Promise = this.postgres.get('Promise');
        const constants = this.postgres.get('constants');

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
            if (skip && skip > 0) searchObj.offset = skip * limit;
            if (limit && limit > 0) searchObj.limit = limit;

            filters = filters || {};
            if (filters.traveledWith !== 'ALL' && !!~constants.TRAVELED_WITH.indexOf(filters.traveledWith)) {
                searchObj.where.traveledWith = constants.TRAVELED_WITH.indexOf(filters.traveledWith);
            }

            if(filters.traveledDate !== 'Any'){
                switch(filters.traveledDate){
                    case 'EntryDate':
                        searchObj.order = [['entryDate', 'DESC']];
                        break;
                    case 'TravelDate':
                        searchObj.order = [['travelDate', 'DESC']];
                        break;
                }
            }

            Review.findAll(searchObj)
                .then(result => JSON.parse(JSON.stringify(result)))
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























