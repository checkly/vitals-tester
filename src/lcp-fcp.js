function showFCPBox() {
    const p = document.createElement('p')
    p.textContent = 'a'
    var el = document.getElementById('content').appendChild(p)
}

function showLCPBox() {
    const p = document.createElement('p')
    p.textContent = 'hisadfsafasdfsdafsdafsdafdsafsdafds'
    var el = document.getElementById('content').appendChild(p)

}

function simulateFCPLCP(config) {
    window.setTimeout(showLCPBox, config.lcp)
    window.setTimeout(showFCPBox, config.fcp)
}

module.exports = {showFCPBox, simulateFCPLCP}
