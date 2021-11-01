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
    showFCPBox()
    const desiredBlockingTime = randomize(config.tbt, config)
    sleep(desiredBlockingTime + 50)
}

module.exports = {simulateBlocking}
