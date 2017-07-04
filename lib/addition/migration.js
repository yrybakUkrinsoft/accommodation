const Sequelize = require('sequelize');
const chalk = require('chalk');
const ora = require('ora');
const dbConfig = {
    database: process.env.AC_DB
    , username: process.env.AC_USER
    , password: process.env.AC_PASSWORD
};

console.log(chalk.green('Migration start:'))
const dbSpinner = ora('Connecting to the db').start();
dbSpinner.color = 'green';

const dbConnection = new Sequelize(
    dbConfig.database
    , dbConfig.username
    , dbConfig.password
    , {
        host: 'localhost'
        , dialect: 'postgres'
        , maxConcurrentQueries: 50
        , pool: {
            max: 100
        }
        , primaryKey: false
        , logging: false
    }
);

const reviews = require('../../mock/reviews.json');
const TRAVEL_WITH = require('../constants').TRAVELED_WITH;
const LOCALE = require('../constants').LOCALE;

dbConnection.sync()
    .then(()=> {
        dbSpinner.succeed('Connection to the db');
        const spinnerChanger = ora('Changing reviews.json').start();
        spinnerChanger.color = 'green';

        let modelData = reviews.map(review=> makeDataForModels(review))
        spinnerChanger.succeed('Changing reviews.json');


        const spinnerPush = ora('Push data to the db').start();
        spinnerPush.color = 'green';
        waterfallAsync(modelData, (currentElement, index)=> {
            return new Promise((resolve, reject)=> {
                let transaction = createTransaction(currentElement);
                dbConnection.query(transaction, {type: dbConnection.QueryTypes.SELECT})
                    .then(()=>resolve(true))
                    .catch(reject)
            })
        }, (resolves, rejects)=> {
            if(resolves.length === modelData.length) {
                spinnerPush.succeed('Push data to the db');
            } else {
                spinnerPush.fail('Push data to the db: Read errors.log file in the current directory for more information');
                fs.writeFileSync('./errors.log', JSON.stringify(rejects));
            }
        })
    })
    .catch(err=> {
        dbSpinner.fail('Connection to the db')
        console.error(err)
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
                cb(currentElement, observableArray.current - 1)
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

function createTransaction(currentElement) {
    let trans = '';
    trans += 'BEGIN;\n'

    trans += insertSql('review', currentElement.review)
    trans += insertSql('review_rating', currentElement.rating, currentElement.review.id)
    trans += insertText('review_text', currentElement.text, currentElement.review.id)
    trans += insertText('review_title', currentElement.title, currentElement.review.id)

    trans += 'COMMIT;\n'
    return trans;
}

function insertText(tableName, texts, reviewId) {
    if (!texts.length) return '';
    return texts.reduce((textsString, text) => textsString + insertSql(tableName, text, reviewId), '')
}

function insertSql(tableName, obj, reviewId) {
    let keys = [];
    let values = [];

    Object.keys(obj).forEach(key => {
        keys.push(`"${key}"`);
        let shieldedValue = shield(obj[key])
        values.push(shieldedValue);
    })
    let keysString = keys.join(',');
    let valuesString = values.join(',');
    return `insert into ${tableName} (${keysString}${reviewId ? ', "reviewId"' : ''}) values (${valuesString}${reviewId ? ', \'' + reviewId + '\'' : ''});\n`;
}

function shield(value) {
    if (typeof value !== 'string') return value;
    return `'${value.replace(/'/g, '\'\'')}'`;
}