const {randomize} = require("./utils");

function showFCPBox(text) {
    const p = document.createElement('p')
    p.textContent = text ? text : 'a'
    var el = document.getElementById('content').appendChild(p)
}

function showLCPBox() {
    const p = document.createElement('p')
    p.textContent = 'hisadfsafasdfsdafsdafsdafdsafsdafds'
    var el = document.getElementById('content').appendChild(p)

}

function simulateFCPLCP(config) {

    window.setTimeout(showLCPBox, randomize(config.lcp, config))
    window.setTimeout(showFCPBox, randomize(config.fcp, config))
}

module.exports = {showFCPBox, simulateFCPLCP}
