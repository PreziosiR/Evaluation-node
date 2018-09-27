const fs = require('fs')

const path = `${__dirname}/node_modules`

module.exports.isReady = function isReady() {
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(err, stats) {    
            if(err) {
                reject(err)
            } else {
                resolve(stats)
            }
        })
    })
}