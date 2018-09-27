const fs = require('fs')
const chalk = require('chalk');

const path = `${__dirname}/node_modules`

fs.stat(path, function(err, stats) {
    console.log(path);

    //si erreur on ne peut utiliser chalk, on utilise le code couleur rouge \x1b[31m
    if(err) {
        console.log('\x1b[31m',"not ready")
    } else {
        console.log(chalk.yellow("maybe"))
        process.exit(0)
    }
    
})