const fs = require('fs')

module.exports.isReady = function isReady(path) {
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