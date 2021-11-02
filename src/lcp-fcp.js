const {randomize} = require("./utils");

function showFCPBox(text) {
    const p = document.createElement('p')
    p.textContent = text ? text : 'a'
    document.getElementById('content').appendChild(p)
}

function showLCPBox() {
    const p = document.createElement('p')
    p.textContent = 'This is the largest contentful paint This is the largest contentful paint This is the largest contentful paint This is the largest contentful paint'
    document.getElementById('content').appendChild(p)

}

function simulateFCPLCP(config) {
    console.log(JSON.stringify(config))
    let fcp = 0
    if (config.fcp !== 0) {
        config.random = config.random_fcp
        fcp = Math.floor(randomize(config.fcp, config))
    }

    let lcp = config.lcp
    if (config.fcp !== config.lcp) {
        config.random = config.random_lcp
        lcp = Math.floor(randomize(config.lcp, config))

    }
    lcp = Math.max(lcp, fcp)
    console.log(`final fcp:${fcp}ms lcp:${lcp}ms`)
    window.setTimeout(showLCPBox, lcp)
    window.setTimeout(() => {
        showFCPBox(`lcp:${lcp} fcp:${fcp} type:${config.type}`)
    }, fcp)
}

module.exports = {showFCPBox, simulateFCPLCP}
