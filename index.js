// Include the server in your file
const server = require('server')
const grepper = require('./grepper')
const compress = require('./compress')
const { get } = server.router

// Handle requests to the url "/" ( http://localhost:3000/ )
server([
    get('/', ctx => 'Hello world!')
])

let times = 1
let seq = 0
setInterval(() => {
    seq++
    if(seq === 60) {
        console.log(`Grepped ${60 * times} datas...`)
        seq = 0
        times++
    }
    grepper.grap('ALL')
}, 1000)

// setInterval(compress.run, 1000 * 60 * 60 * 24)
