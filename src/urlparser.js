const mode = {
    LCP_FCP:'lcp_fcp',
    TBT: 'tbt'
}

function getMode(){
    const urlParams = new URLSearchParams(window.location.search);
    const lcp = urlParams.get('lcp')
    const fcp = urlParams.get('fcp')
    const lcp_number = new Number(lcp)
    const fcp_number = new Number(fcp)

    if (lcp!==null && lcp_number!== NaN) {
        return {mode: mode.LCP_FCP,lcp: lcp_number, fcp: fcp_number}
    }

    const tbt = urlParams.get('tbt')
    tbt_number = new Number(tbt)
    if (tbt !== null && tbt_number!== NaN){
        return {mode: mode.TBT,tbt: tbt_number, fcp: fcp_number}
    }

}

module.exports = {mode, getMode}