const DATE_SORT_CONST = require('../constants').DATE_SORT_CONST;

exports.sortBy = (data, sortby) => {
    if (!(Array.isArray(data) && data.length > 0)) return [];

    switch (sortby) {
        case DATE_SORT_CONST.TRAVEL:
            return data.sort((a, b)=>(b.travelDate - a.travelDate));
        case DATE_SORT_CONST.SUBMISSION:
            return data.sort((a, b)=>(b.entryDate - a.entryDate));
        default:
            return data;
    }
}