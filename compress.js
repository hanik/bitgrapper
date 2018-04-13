const fs = require('fs')
const zip = new require('node-zip')()
const luxon = require('luxon')

const run = () => {
    const weekday = luxon.DateTime.local().weekday
    if(weekday != 5) {
        console.log(`This is not Friday.`)
        return;
    }

    console.log(`Friday compressing!`)
    const utc = luxon.DateTime.local().toFormat('yyLLdd_HH')
    const today = luxon.DateTime.local().toFormat('yyLLdd')
    const PATH = './datas'
    const removeFileNames = []
    const dir = fs.readdirSync(PATH)

    console.log(`Prepare files...`)
    dir.forEach((fileName, index) => {
        if(fileName.endsWith('.txt') && fileName.indexOf(utc) < 1){
            const path = `${PATH}/${fileName}`
            zip.file(fileName, fs.readFileSync(path))
            removeFileNames.push(path)
        }
    })

    console.log(`Generate zip file...`)
    let zipFileName = `./compress/datas_${dir[0].split('_')[1]}_${today}.zip`
    console.log(zipFileName)

    const data = zip.generate({ base64:false, compression: 'DEFLATE' });

    console.log(`Writeing zip file...`)
    // it's important to use *binary* encode
    fs.writeFileSync(zipFileName, data, 'binary');

    console.log(`Remove compressed files.`)
    removeFileNames.forEach( (filepath) => {
        fs.unlinkSync(filepath)
    })

    console.log(`Compress done.`)
}

module.exports = {
    run,
}

