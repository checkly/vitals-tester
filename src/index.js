const {showFCPBox, showLCPBox} = require('./lcp-fcp')
const {mode, parseConfig} = require('./urlparser')
const {simulateBlocking} = require('./tbt')
const {simulateCls} = require('./cls')

function randomize(number, config) {
    if (!config.random) {
        return
    }
    let max = Math.abs(config.random)
    let min = -max
    const value = Math.random() * (max - min) + min;
    return Math.max(0, number + value)
}

const config = parseConfig()
if (config.mode === mode.LCP_FCP) {
    window.setTimeout(showLCPBox, config.lcp)
    window.setTimeout(showFCPBox, config.fcp)
    return
}

if (config.mode === mode.TBT) {
    window.setTimeout(showFCPBox, config.fcp)
    simulateBlocking(config.tbt)
    return
}

if (config.mode === mode.CLS) {
    console.log("rnd" + randomize(config.cls, config))
    simulateCls(randomize(config.cls, config))
    return
}
document.write('none')
