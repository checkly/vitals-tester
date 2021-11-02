const {
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

const urlParams = new URLSearchParams(window.location.search);

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

function isDefined(metric) {
    const defined = urlParams.get(metric)
    if (defined === null) {
        return {defined: false}
    }
    const num = Number(defined)
    if (!Number.isNaN(num)) {
        return {defined: true, number: true, value: num}
    }

    const score = Object.entries(WEB_VITALS_SCORES).find(x => x[1] === defined)
    if (!score) {
        return {defined: false}
    }
    return {defined: true, number: false, value: score}
}

function handleLcpAndFcp(lcp_defined, fcp_defined, thresholds) {
    const lcp_result = handleLcp(lcp_defined, thresholds)
    const fcp_result = handleFcp(fcp_defined, thresholds)
    return {
        mode: mode.LCP_FCP,
        fcp: fcp_result.fcp,
        random: getRandom(),
        random_fcp: fcp_result.random_fcp,
        random_lcp: lcp_result.random_lcp,
        lcp: lcp_result.lcp
    }
}

function handleFcp(definition, thresholds) {
    if (definition.number) {
        return {
            mode: mode.LCP_FCP,
            fcp: definition.value,
            lcp: definition.value + 1,
            random_lcp: 0,
            random_fcp: getRandom(),
        }
    }
    if (!definition.defined) {
        return
    }
    const category = hasCategory(definition.value[1], thresholds.FCP, mode.LCP_FCP)

    if (category) {
        return {
            mode: mode.LCP_FCP,
            fcp: category.lcp_fcp,
            lcp: category.lcp_fcp,
            random_fcp: category.random,
            random_lcp: 0
        }
    }
}

function handleLcp(definition, thresholds) {
    if (definition.number) {
        return {
            mode: mode.LCP_FCP,
            lcp: definition.value,
            fcp: 0,
            random_fcp: 0,
            random_lcp: getRandom()
        }
    }
    if (!definition.defined) {
        return
    }
    const category = hasCategory(definition.value[1], thresholds.LCP, mode.LCP_FCP)
    if (category) {
        return {
            mode: mode.LCP_FCP,
            lcp: category.lcp_fcp,
            fcp: 0,
            random_fcp: 0,
            random_lcp: category.random,
        }
    }
}

function getRandom() {
    const random = urlParams.get('random')
    const random_number = Number(random)
    if (random !== null && !Number.isNaN(random_number)) {
        return random_number
    }
    return null
}

function parseConfig() {
    const lcp_defined = isDefined('lcp')
    const fcp_defined = isDefined('fcp')

    let thresholds = WEB_VITALS_SCORE_THRESHOLDS_DESKTOP;
    let result_type = type.DESKTOP

    if (type.MOBILE === urlParams.get('type')) {
        result_type = type.MOBILE
    }
    if (result_type === type.MOBILE) {
        thresholds = WEB_VITALS_SCORE_THRESHOLDS_MOBILE
    }

    if (lcp_defined.defined && fcp_defined.defined) {
        return handleLcpAndFcp(lcp_defined, fcp_defined, thresholds)
    }
    if (lcp_defined.defined) {
        return handleLcp(lcp_defined, thresholds)
    }
    if (fcp_defined.defined) {
        return handleFcp(fcp_defined, thresholds)
    }

    let result = {}
    const random = getRandom()


    const tbt = urlParams.get('tbt')
    const tbt_number = Number(tbt)
    if (tbt !== null && !Number.isNaN(tbt_number)) {
        result = {mode: mode.TBT, tbt: tbt_number, fcp: 0, type: result_type, random: random}
    }


    const tbtCategory = hasCategory(tbt, thresholds.TBT, mode.TBT)
    if (tbtCategory) {
        result = {mode: mode.TBT, tbt: tbtCategory.tbt, random: tbtCategory.random, type: result_type}
    }

    const cls = urlParams.get('cls')
    const cls_number = Number(cls)
    if (cls !== null && cls_number >= 0 && cls_number <= 1) {
        result = {mode: mode.CLS, cls: cls_number, random: random}
    }
    const clsCategory = hasCategory(cls, thresholds.CLS, mode.CLS)
    if (clsCategory) {
        result = {mode: mode.CLS, cls: clsCategory.cls, random: clsCategory.random, type: result_type}
    }

    return result
}

module.exports = {mode, parseConfig}
