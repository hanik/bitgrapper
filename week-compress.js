const fs = require('fs')
const zip = new require('node-zip')()
const luxon = require('luxon')

const run = () => {
    console.log(`Week compressing!`)
    const utc = luxon.DateTime.local().toFormat('yyLLdd_HH')
    const today = luxon.DateTime.local().toFormat('yyLLdd')
    const PATH = './datas'
    const removeFileNames = []
    const dir = fs.readdirSync(PATH)

    console.log(`Prepare files...`)
    let startDay = 0
    let endDay = 0
    let dayCount = 0
    dir.forEach((fileName, index) => {
        if(fileName.endsWith('.txt')){
            const day = Number(fileName.split('_')[1])
            if(startDay === 0) {
                startDay = day
                endDay = day
            } else if(endDay != day) {
                dayCount++
            }
            if(dayCount < 7) {
                endDay = day
                const path = `${PATH}/${fileName}`
                zip.file(fileName, fs.readFileSync(path))
                removeFileNames.push(path)
            } else {
                return
            }
        }
    })
    console.log(`Prepare ${removeFileNames.length} files.`)
    console.log(`Generate zip file...`)
    let zipFileName = `./compress/datas_${startDay}_${endDay}.zip`
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

run()
