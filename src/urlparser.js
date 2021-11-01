const mode = {
    LCP_FCP:'lcp_fcp',
    TBT: 'tbt',
    CLS: 'cls'
}

function parseConfig(){
    const urlParams = new URLSearchParams(window.location.search);
    const lcp = urlParams.get('lcp')
    const fcp = urlParams.get('fcp')
    const lcp_number = new Number(lcp)
    const fcp_number = new Number(fcp)

    
let result = {}
    if (lcp!==null && lcp_number!== NaN) {
        result = {mode: mode.LCP_FCP,lcp: lcp_number, fcp: fcp_number}
    }

    const tbt = urlParams.get('tbt')
    tbt_number = new Number(tbt)
    if (tbt !== null && tbt_number!== NaN){
        result = {mode: mode.TBT,tbt: tbt_number, fcp: fcp_number}
    }

    const cls = urlParams.get('cls')
    const cls_number = new Number(cls)
    if (cls!== null && cls_number>=0 && cls_number <=1){
        result = {mode: mode.CLS, cls: cls_number }
    }

    const random = urlParams.get('random')
    const random_number = new Number(random)
    if (random !== null && random_number!== NaN){
result.random = random_number
    }
return result
}

module.exports = {mode, parseConfig}