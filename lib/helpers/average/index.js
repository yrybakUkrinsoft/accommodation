const Promise = require('bluebird');
const fork = require('child_process').fork;
const join = require('path').join

module.exports = reviews => new Promise((resolve, reject)=> {

    var child = fork(join(__dirname, 'computeAverage.js'))

    child.on('message', result=> {
        if (result.error) {
            return reject(result.message)
        }
        return resolve(result.average)
    })
    child.on('error', error => {
        return reject(error.message)
    })

    child.send(reviews)
})