
   const intViewportHeight = document.documentElement.clientHeight
   const intViewportWidth = document.documentElement.clientWidth
   // if we go too fast here, it will create flaky metric results
   let delay = 50

function largestDimension() {
    return Math.max(intViewportHeight, intViewportWidth)
}

function horizontal(){
    return largestDimension() === intViewportHeight
}

function getPercent(percent){
    //const intViewportHeight = window.innerHeight;
 
    return `${largestDimension()*percent/100}px`
}
function addPercent(percent, prop) {
    const n = new Number(prop.replace("px", ""))
    const pixels = largestDimension()*percent/100
    return `${n+pixels}px`
}
function width(){
    return `${intViewportWidth}px`
}

function height(){
    return `${intViewportHeight}px`
}

function createHorizontalContentfulBlock(){
    const p = document.createElement('p')
    p.textContent='a contentful block'
    p.style.height=getPercent(5)
    p.style.width=width()
    p.style.overflow='hidden'
    p.style.position = "absolute";
    p.style.backgroundColor='#aaa'
    document.getElementById('content').appendChild(p)
}

function createVerticalContentfulBlock(){
    const p = document.createElement('p')
    p.textContent='a contentful paint'
    p.style.height=height()
    p.style.overflow='hidden'
    p.style.position = "absolute";
    p.style.width=getPercent(5)
    p.style.backgroundColor='#aaa'
    document.getElementById('content').appendChild(p)
}


async function moveAll(elems, times){
    for (let i = 0; i<times; i++)
    for (el of elems){
        await moveBy(el,5)
    }
    
        
    
}

async function move(el, times){
    for (let i = 0; i<times; i++)
        await moveBy(el,5)
    
}
 function moveBy(el, percent) {  
     if (el.getAttribute('id')==='partial'){
        const max = new Number(el.getAttribute('max-steps'))
        let current = new Number(el.getAttribute('steps') )
        current++
        if (current>max) return
        el.setAttribute('steps', current)
     }
    return new Promise((resolve)=>{        
    window.setTimeout(()=>{   
            if (!horizontal())
            el.style.left = addPercent(percent, el.style.left)
            else 
            el.style.top = addPercent(percent, el.style.top)
            resolve()
        }, delay)
    })
}
function howMany(desiredCls){
const fullRuns = Math.floor(desiredCls/0.095)
const extraSteps = Math.round((desiredCls - fullRuns*0.095)/0.005)
let create = fullRuns
if (extraSteps>0) {
    create++
}
if (create>5){
    delay=20
}
    return {fullRuns: fullRuns, extraSteps: extraSteps, count:create, delay: delay}
}
 function simulateCls(desiredCls) {
    console.log(desiredCls)
    const config = howMany(desiredCls)
if (horizontal()){
    console.log("horizontal")
    for (let n = 0; n<config.count; n++)
    createHorizontalContentfulBlock()
 const elems = document.getElementsByTagName('p')
    elems[0].setAttribute('id','partial')
    elems[0].setAttribute('max-steps',config.extraSteps)
    elems[0].setAttribute('steps',0)
moveAll(elems, 20)
}
    else{
        console.log("vertical")
        
       
        for (let n = 0; n<config.count; n++)
        createVerticalContentfulBlock()
     const elems = document.getElementsByTagName('p')
        elems[0].setAttribute('id','partial')
        elems[0].setAttribute('max-steps',config.extraSteps)
        elems[0].setAttribute('steps',0)
moveAll(elems, 20)


}




}

module.exports = { simulateCls }