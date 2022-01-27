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

function addButton(){
    const button = document.createElement('button')
    button.textContent="TEST BUTTON"
    document.getElementById('content').appendChild(button)
}

function simulateBlocking(config) {
    const desiredBlockingTime = Math.floor(randomize(config.tbt, config))
    console.log(JSON.stringify(config))
    console.log(`blocking for:${desiredBlockingTime}ms`)
    showFCPBox(`blocking time will be: ${desiredBlockingTime} (${config.type} threshold)`)
    addButton()
    if (desiredBlockingTime) {
        sleep(desiredBlockingTime + 50)
    }
}

module.exports = {simulateBlocking}
