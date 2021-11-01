const {randomize} = require("./utils");

function showFCPBox(text) {
    const p = document.createElement('p')
    p.textContent = text ? text : 'a'
    var el = document.getElementById('content').appendChild(p)
}

function showLCPBox() {
    const p = document.createElement('p')
    p.textContent = 'This is the largest contentful paint This is the largest contentful paint This is the largest contentful paint This is the largest contentful paint'
    var el = document.getElementById('content').appendChild(p)

}

function simulateFCPLCP(config) {
    let fcp = 0
    if (config.fcp!==0) {
        fcp = Math.floor(randomize(config.fcp, config))
    }

    let lcp = config.lcp
    if (config.fcp !== config.lcp) {
        lcp = Math.floor(randomize(config.lcp, config))

    }
    lcp = Math.max(lcp, fcp)

    window.setTimeout(showLCPBox, lcp)
    window.setTimeout(()=>{showFCPBox(`lcp:${lcp} fcp:${fcp} type:${config.type} random:${config.random}`)},fcp )
}

module.exports = {showFCPBox, simulateFCPLCP}
