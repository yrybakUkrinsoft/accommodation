const CONSTANTS = require('../../constants');
const sinfulMath = require('sinful-math.js')

process.on('message', reviews => {
    try {
        if (!Array.isArray(reviews)) sendResult({error: true, message: 'Reviews must be an Array type.'});
        if (!reviews.length) return sendResult({error: true, message: 'Reviews must be not empty Array.'});

        const computedObject = {
            global: []
        };
        reviews.forEach(review => {
            let traveledWith = CONSTANTS.TRAVELED_WITH[review.traveledWith];
            if (!(traveledWith in computedObject)) computedObject[traveledWith] = [];
            review.rating.entryDate = +review.entryDate;
            computedObject.global.push(review.rating);
            computedObject[traveledWith].push(review.rating);
        });

        Object.keys(computedObject).forEach(aspect => {
            if (!computedObject[aspect].length) {
                delete computedObject[aspect];
                return;
            }

            if (computedObject[aspect].length === 1) {
                computedObject[aspect] = computedObject[aspect][0];
                delete computedObject[aspect].entryDate;
                return;
            }

            let comp = computedObject[aspect].reduce((prev, cur) => sumValues(prev, cur));
            computedObject[aspect] = divideByCount(comp);
        });

        return sendResult({average: computedObject});
    } catch (err) {
        console.error(err)
        return sendResult({error: true, message: err.message})
    }
})

function divideByCount(rating) {
    Object.keys(rating).forEach(rat => {
        if (rat === 'count') return;
        let average = sinfulMath.div(rating[rat], rating.count)
        rating[rat] = sinfulMath.div(Math.round(average * 100), 100);
    });
    delete rating.count;
    delete rating.entryDate;
    return rating;
}

function sumValues(prev, cur) {
    let result = Object.assign({}, prev, {count: prev.count || 1});
    Object.keys(prev).forEach(el=> {
        if (el === 'entryDate' || el === 'count') return;
        if (result.count === 1) result[el] = calculateValue(prev[el], prev.entryDate);
        result[el] = sinfulMath.add(result[el], calculateValue(cur[el], cur.entryDate));
    });
    result.count++;

    return result;
}

function calculateValue(val, entryDate) {
    // 1 - (current_year - year_of_review)*0.1
    let currentYear = new Date().getFullYear();
    let reviewYear = new Date(entryDate).getFullYear();
    let yearDiff = currentYear - reviewYear;

    return yearDiff > 5
        ? sinfulMath.mul(val, .5)
        : sinfulMath.mul(val, sinfulMath.sub(1, sinfulMath.mul(yearDiff, .1)));
}

function sendResult(result) {
    result = result || {
            general: 0,
            location: 0,
            service: 0,
            priceQuality: 0,
            food: 0,
            room: 0,
            childFriendly: 0,
            interior: 0,
            size: 0,
            activities: 0,
            restaurants: 0,
            sanitaryState: 0,
            accessibility: 0,
            nightlife: 0,
            culture: 0,
            surrounding: 0,
            atmosphere: 0,
            noviceSkiArea: 0,
            advancedSkiArea: 0,
            apresSki: 0,
            beach: 0,
            entertainment: 0,
            environmental: 0,
            pool: 0,
            terrace: 0,
        };

    // send query string next for making sql query in other place
    process.send(result);

    // just close current process with 0 code (success)
    process.exit(0);
}
