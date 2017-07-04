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
                include: [
                    {
                        model: self.postgres.getModel('Review_rating'),
                        where: {}
                    },
                    {
                        model: self.postgres.getModel('Review_text'),
                        where: {}
                    },
                    {
                        model: self.postgres.getModel('Review_title'),
                        where: {}
                    }
                ],
                where: {}
            };

            // add filters
            let traveledWithFilter = filters[0] ? filters[0].toUpperCase() : null;
            let traveledWith = constants.TRAVELED_WITH.indexOf(traveledWithFilter);
            if(traveledWith !== -1){
                searchObj.where.traveledWith = traveledWith;
            }

            // add limits
            if (skip && skip > 0) searchObj.offset = skip;
            if (limit && limit > 0) searchObj.limit = limit;
            Review.findAll(searchObj)
                .then(resolve)
                .catch(reject)
        })
    }
}

























