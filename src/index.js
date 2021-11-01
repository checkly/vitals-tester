const {simulateFCPLCP} = require('./lcp-fcp')
const {mode, parseConfig} = require('./urlparser')
const {simulateBlocking} = require('./tbt')
const {simulateCls} = require('./cls')

const config = parseConfig()
if (config.mode === mode.LCP_FCP) {
    simulateFCPLCP(config)
    return
}

if (config.mode === mode.TBT) {
    simulateBlocking(config)
    return
}

if (config.mode === mode.CLS) {
    simulateCls(config)
    return
}

document.write('none')
