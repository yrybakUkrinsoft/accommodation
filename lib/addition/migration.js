const dbConnection = {}

const reviews = require('../../mock/reviews.json')
const TRAVEL_WITH = require('../constants').TRAVELED_WITH
const LOCALE = require('../constants').LOCALE

let modelData = reviews.map(review=> makeDataForModels(review))

waterfallAsync(modelData, (currentElement, index)=>{
    return new Promise((resolve, reject)=>{
        //make db queries
    })
}, (resolves, rejects)=>{
    // make something with result
})

function makeDataForModels(review) {
    return {
        review: {
            id: review.id
            , traveledWith: TRAVEL_WITH.indexOf(review.traveledWith)
            , entryDate: review.entryDate
            , travelDate: review.travelDate
            , locale: LOCALE.indexOf(review.locale)
            , user: review.user
        },
        title: Object.keys(review.titles).map(locale => ({
            locale: LOCALE.indexOf(locale)
            , title: review.titles[locale]
        })),
        text: Object.keys(review.texts).map(locale => ({
            locale: LOCALE.indexOf(locale)
            , text: review.texts[locale]
        })),
        rating: (function () {
            let rating = {
                general: review.ratings.general.general
            }
            for (let name in review.ratings.aspects) {
                rating[name] = review.ratings.aspects[name];
            }
            return rating
        }())
    }
}

function waterfallAsync(array, cb, globalCb) {
    let observableArray = array;
    observableArray.current = 0;
    observableArray.next = ()=> observableArray.isAvailable() ? observableArray[observableArray.current++] : null;
    observableArray.isAvailable = () => observableArray.length > observableArray.current;

    let globalResolve = [];
    let globalRejects = [];
    let chainBlock = ()=> {
        return new Promise((resolve, reject) => {
            if (observableArray.isAvailable()) {
                let currentElement = observableArray.next();
                cb(currentElement, observableArray.current-1)
                    .then(res => resolve({
                        result: res,
                        end: false
                    }))
                    .catch(reject)
            } else {
                resolve({
                    end: true
                })
            }
        })
    }

    let chain = ()=> {
        return chainBlock()
            .then(resolve => {
                if (!resolve.end) {
                    globalResolve.push(resolve.result);
                    return chain();
                }
                return;
            })
            .catch(reject => {
                globalRejects.push(reject)
                return chain();
            })
    }

    chain()
        .then(()=> {
            globalCb(globalResolve, globalRejects)
        })

}