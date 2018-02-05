const fs = require('fs');
const zip = new require('node-zip')();

const removeFileNames = []
const dir = fs.readdirSync('./datas')
dir.forEach((fileName) => {
    if (fileName.endsWith('.txt')) {
        const path = `./datas/${fileName}`
        zip.file(fileName, fs.readFileSync(path))
        removeFileNames.push(path)
    }
})

const data = zip.generate({ base64:false, compression: 'DEFLATE' });

// it's important to use *binary* encode
fs.writeFileSync('test.zip', data, 'binary');

removeFileNames.forEach( (path) => {
    fs.unlinkSync(path)
})