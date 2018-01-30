const axios = require('axios')
const luxon = require('luxon')
const fs = require('fs')

/*
    {currency} =
        BTC, ETH, DASH, LTC, ETC, XRP, BCH, XMR,
        ZEC, QTUM, BTG, EOS (기본값: BTC), ALL(전체)
 */

const grap = async (currency) => {
    const data = await axios.get(`https://api.bithumb.com/public/ticker/${currency}`)
        .then(response => response.data)
        .catch(function (error) {
            console.log(error);
        });
    const utc = luxon.DateTime.local().toFormat('yyLLdd_HH')

    let fd;
    try {
        fd = fs.openSync(`./datas/${currency}_${utc}.txt`, 'a')
        fs.appendFileSync(fd, JSON.stringify(data) + '\n', 'utf8');
    } catch (err) {
        console.error(err.message)
    } finally {
        if (fd !== undefined)
            fs.closeSync(fd);
    }

    return data
}

module.exports = {
    grap,
}