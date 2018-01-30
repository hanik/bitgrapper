// Include the server in your file
const server = require('server');
const grepper = require('./grepper')
const { get, post } = server.router;

// Handle requests to the url "/" ( http://localhost:3000/ )
server([
    get('/', ctx => 'Hello world!')
]);

let times = 0;
let seq = 0;
setInterval(() => {
    seq++
    if(seq === 60) {
        console.log(`Grepped ${seq} * ${times} datas...`)
        seq = 0
        times++
    }
    grepper.grap('ALL')
}, 1000);
