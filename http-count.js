const express = require("express")
const fs = require("fs")
const http = require("http")
const Twig = require('twig')

const app = express()
const twig = Twig.twig

const PublicRoot = __dirname + '/views'
let port = process.argv[3]
let Current = 0 
let alltime = 0

port = parseInt(port)

if(typeof port == "number" && port !== '' && port >= 0 && port < 65536 ){
    http.createServer(app).listen(port, (err, content) => {
        if(err){
            console.log('Port Error')
        } else {
            console.log('Server running on port ' + port)
            fs.readFile('./counter/' + port  + '.txt', (err, content) => {
                if (err) {
                    console.log('Pas de fichier')
                    fs.writeFile('./counter/' + port  + '.txt', '0', function(err) {
                        if(err){
                            console.log('File Creation error')
                        } else {
                            console.log('File saved')
                        }    
                    })
                } else {
                    console.log('File already exist')
                }
            })
        }
    })   
} else {
    console.log('port invalide')
}


app.use('/', express.static(PublicRoot))

app.get('/', (req, res) => {
    fs.readFile(__dirname + '/counter/' + port + '.txt', (err, content) => {
        if(err) {
            console.log(err)
        } else {
            alltime = content.toString()
        }
    })
    res.render('index.twig', {
        countCurrent : Current,
        countAlltime: alltime
    });
    Current ++
    incrementCount()
})

app.get('/hop', (req, res) => {
    res.sendfile(__dirname + '/views/hop.html')
    Current ++
    incrementCount()
})

app.get('/plop', (req, res) => {
    res.sendfile(__dirname + '/views/plop.html')
    Current ++
    incrementCount()
})

function incrementCount() {
    const data = fs.readFile('./counter/' + port + '.txt', (err, content) => {
        if(err){
            console.log(err)
        } else {
            fs.writeFile('./counter/' + port + '.txt',parseInt(content.toString()) + 1, (err, content) => {
                if(err){
                    console.log(err)
                } else {
                    console.log('Value of all times +1 ')
                }
            })
        }
    })
}

function reset() {
    if(document.getElementById("currentcheck")) {
        Current = 0
    }
    if(document.getElementById("alltimecheck")) {
        fs.unlink('/counter/' + port + '.txt', (err, content) => {
            if(err) {
                console.log(err)
            } else {
                console.log('File ' + port + 'has been set to 0')
            }
        })
    }
}

exports.module = {
    reset: reset
}