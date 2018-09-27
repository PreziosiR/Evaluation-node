const ready = require('./is-ready')
const chalk = require('chalk');

ready.isReady().then(function(value) {
    console.log(chalk.yellow("maybe"))
    console.log(value)
    process.exit(0)
})
//sinon on affiche not ready en rouge
ready.isReady().catch(function(value) {
    //si erreur on ne peut utiliser chalk, on utilise le code couleur rouge \x1b[31m
    console.log('\x1b[31m', "not ready")
    console.log(value)
    process.exit(255)
})