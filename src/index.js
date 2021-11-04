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



const xhr = new XMLHttpRequest()
xhr.open('GET', 'static/intro.html', true)
xhr.onreadystatechange = function () {
    if (this.readyState !== 4) {
        return
    }
    if (this.status !== 200) {
        return
    }
    //document.getElementById('content').innerHTML = this.responseText
    document.write(this.responseText)
};
xhr.send();
