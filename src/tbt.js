const {randomize} = require('./utils')
const {showFCPBox} = require("./lcp-fcp");

function sleep(milliseconds) {
    const start = new Date().getTime()
    for (let i = 0; i < Infinity; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break
        }
    }
}

function simulateBlocking(config) {
    const desiredBlockingTime = Math.floor(randomize(config.tbt, config))
    showFCPBox(`blocking time will be: ${desiredBlockingTime}`)
    if (desiredBlockingTime) {
        sleep(desiredBlockingTime + 50)
    }
}

module.exports = {simulateBlocking}
