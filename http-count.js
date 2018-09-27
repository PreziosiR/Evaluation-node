const express = require("express")
const fs = require("fs")
const http = require("http")
const app = express()

const PublicRoot = __dirname + '/vue'

let port = process.argv[3]
port = parseInt(port)

let Current = 0 

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
    res.sendFile(__dirname + '/vue/index.html')
    incrementCount()
    writeCounter()
})

app.get('/hop', (req, res) => {
    res.sendfile(__dirname + '/vue/hop.html')
    incrementCount(Current)
})

app.get('/plop', (req, res) => {
    res.sendfile(__dirname + '/vue/plop.html')
    incrementCount(Current)
})

function incrementCount(Current) {
    Current += 1
    const data = fs.readFile('./counter/' + port + '.txt', (err, content) => {
        if(err){
            console.log(err)
        } else {
            fs.writeFile('./counter/' + port + '.txt',parseInt(content.toString()) + 1, function(err) {
                if(err){
                    console.log(err)
                } else {
                    console.log('Value of all times +1')
                }
            })
        }
    })
}

function writeCounter() {
    document.getElementById("current").innerHTML += Current

    fs.readFile('./counter/' + port + '.txt', (err, content) => {
        if(err) {
            console.log(err)
        } else {
            document.getElementById("alltime").innerHTML += content.toString()
        }
    })
}
