const {showFCPBox, showLCPBox} = require('./lcp-fcp')
const {mode, parseConfig} = require('./urlparser')
const {simulateBlocking} = require('./tbt')
const {simulateCls} = require('./cls')

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
    simulateCls(config)
    return
}

if (config.mode === mode.CLS) {
    simulateCls(config)
    return
}
document.write('none')
