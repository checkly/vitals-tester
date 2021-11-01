const {
    WEB_VITALS_METRICS,
    WEB_VITALS_SCORES,
    WEB_VITALS_SCORE_THRESHOLDS_DESKTOP,
    WEB_VITALS_SCORE_THRESHOLDS_MOBILE
} = require('./constants')

const mode = {
    LCP_FCP: 'lcp_fcp',
    TBT: 'tbt',
    CLS: 'cls'
}

const type = {
    DESKTOP: 'DESKTOP',
    MOBILE: 'MOBILE'
}

function hasCategory(metric, thresholds, current_mode) {
    const score = Object.entries(WEB_VITALS_SCORES).find(x => x[1] === metric)
    if (!score) {
        return
    }

    if (metric === WEB_VITALS_SCORES.GOOD) {
        return {[current_mode]: thresholds[0] / 2, random: thresholds[0] / 2 - 1}
    }
    if (metric === WEB_VITALS_SCORES.POOR) {
        const center = (thresholds[1] + thresholds[2]) / 2
        return {[current_mode]: center, random: thresholds[2] - center - 1}
    }

    if (metric === WEB_VITALS_SCORES.NEEDS_IMPROVEMENT) {
        const center = (thresholds[0] + thresholds[1]) / 2
        return {[current_mode]: center, random: thresholds[1] - center - 1}
    }
}

function parseConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    const lcp = urlParams.get('lcp')
    const fcp = urlParams.get('fcp')
    const lcp_number = new Number(lcp)
    const fcp_number = new Number(fcp)


    let result = {}
    const random = urlParams.get('random')
    const random_number = new Number(random)
    if (random !== null && random_number !== NaN) {
        result.random = random_number
    }

    result.type = type.DESKTOP

    if (type.MOBILE === urlParams.get('type')) {
        result.type = type.MOBILE
    }

    let thresholds = WEB_VITALS_SCORE_THRESHOLDS_DESKTOP;

    if (result.type === type.MOBILE) {
        thresholds = WEB_VITALS_SCORE_THRESHOLDS_MOBILE

    }


    if (lcp !== null && lcp_number !== NaN) {
        result = {mode: mode.LCP_FCP, lcp: lcp_number, fcp: fcp_number, type: result.type}
    }

    const tbt = urlParams.get('tbt')
    tbt_number = new Number(tbt)
    if (tbt !== null && tbt_number !== NaN) {
        result = {mode: mode.TBT, tbt: tbt_number, fcp: fcp_number, type: result.type}
    }


    const tbtCategory = hasCategory(tbt, thresholds.TBT, mode.TBT)
    if (tbtCategory) {
        result = {mode: mode.TBT, tbt: tbtCategory.tbt, random: tbtCategory.random, type: result.type}
    }

    const cls = urlParams.get('cls')
    const cls_number = new Number(cls)
    if (cls !== null && cls_number >= 0 && cls_number <= 1) {
        result = {mode: mode.CLS, cls: cls_number}
    }

    return result
}

module.exports = {mode, parseConfig}
