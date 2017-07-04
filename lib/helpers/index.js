const CONSTANTS = require('../constants')
const sort = require('./sort')


module.exports = {
    sort: sort
    , getLocale: idx=>CONSTANTS.LOCALE[idx]
    , getTraveledWith: idx => CONSTANTS.TRAVELED_WITH[idx]
    , numberOrNull: value => parseInt(value) || null
    , parseArray: value => {
        if (Array.isArray(value)) return value;
        try {
            value = JSON.parse(value);
        } catch (e) {
            value = null;
        } finally {
            value = Array.isArray(value) ? value : [];
        }
        return value;
    }
}