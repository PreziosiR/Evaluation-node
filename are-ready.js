const ready = require('./is-ready')
const chalk = require('chalk');

const pathNode = `${__dirname}/node_modules`
const pathReadme = `${__dirname}/readme.md`

const readme = ready.isReady(pathReadme)
const node_modules = ready.isReady(pathNode)

Promise.all([readme, node_modules]).then(function(values){
    console.log(chalk.yellow("maybe"))
    console.log(values)
    process.exit(0)
}).catch(function(reason) {
    console.log('\x1b[31m', "error, nodes or readme not found")
    console.log(reason)
    process.exit(255)
})