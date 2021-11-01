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
        return {[current_mode]: thresholds[0] / 2, random: thresholds[0] / 2}
    }
    if (metric === WEB_VITALS_SCORES.POOR) {
        const center = (thresholds[1] + thresholds[2]) / 2
        return {[current_mode]: center, random: thresholds[2] - center}
    }

    if (metric === WEB_VITALS_SCORES.NEEDS_IMPROVEMENT) {
        const center = (thresholds[0] + thresholds[1]) / 2
        return {[current_mode]: center, random: thresholds[1] - center}
    }
}

function parseConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    const lcp = urlParams.get('lcp')
    const fcp = urlParams.get('fcp')
    const lcp_number = Number(lcp)
    const fcp_number = Number(fcp)


    let result = {}
    const random = urlParams.get('random')
    const random_number = Number(random)
    if (random !== null && !Number.isNaN(random_number)) {
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

    if (fcp !== null && !Number.isNaN(fcp_number)) {
        result = {mode: mode.LCP_FCP, lcp: fcp_number, fcp: fcp_number, type: result.type, random_fcp: result.random}
    }
    const fcpCategory = hasCategory(fcp, thresholds.FCP, mode.LCP_FCP)

    if (fcpCategory) {
        result = {mode: mode.LCP_FCP, fcp: fcpCategory.lcp_fcp, random_fcp: fcpCategory.random, type: result.type}
    }

if (!result.mode === mode.LCP_FCP){
    result = {fcp_number: 0, random_fcp: 0}
}
    if (lcp !== null &&  !Number.isNaN(lcp_number)) {
        result = {mode: mode.LCP_FCP, lcp: Math.max(lcp_number, result.fcp), type: result.type, random_lcp: result.random, ...result}
    }
    const lcpCategory = hasCategory(lcp, thresholds.LCP, mode.LCP_FCP)

    if (lcpCategory) {
        result = {mode: mode.LCP_FCP, lcp: lcpCategory.lcp_fcp, random_lcp: lcpCategory.random, type: result.type, ...result}
    }

if (result.mode === mode.LCP_FCP){
    return result
}



    const tbt = urlParams.get('tbt')
    const tbt_number = Number(tbt)
    if (tbt !== null && !Number.isNaN(tbt_number)) {
        result = {mode: mode.TBT, tbt: tbt_number, fcp: fcp_number, type: result.type}
    }


    const tbtCategory = hasCategory(tbt, thresholds.TBT, mode.TBT)
    if (tbtCategory) {
        result = {mode: mode.TBT, tbt: tbtCategory.tbt, random: tbtCategory.random, type: result.type}
    }

    const cls = urlParams.get('cls')
    const cls_number = Number(cls)
    if (cls !== null && cls_number >= 0 && cls_number <= 1) {
        result = {mode: mode.CLS, cls: cls_number, random: result.random}
    }
    const clsCategory = hasCategory(cls, thresholds.CLS, mode.CLS)
    if (clsCategory) {
        result = {mode: mode.CLS, cls: clsCategory.cls, random: clsCategory.random, type: result.type}
    }

    return result
}

module.exports = {mode, parseConfig}
