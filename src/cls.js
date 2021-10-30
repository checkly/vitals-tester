
   const intViewportHeight = document.documentElement.clientHeight
   const intViewportWidth = document.documentElement.clientWidth
   const delay = 5

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

async function move(el, times){
    for (let i = 0; i<times; i++)
        await moveBy(el,5)
    
}
 function moveBy(el, percent) {
     
    return new Promise((resolve)=>{
        
    window.setTimeout(()=>{
        console.log(addPercent(percent, el.style.left))
    
       
            
            
            if (!horizontal())
            el.style.left = addPercent(percent, el.style.left)
            else 
            el.style.top = addPercent(percent, el.style.top)
            resolve()
        }, delay)
    })
}

function simulateCls(desiredCls) {
    console.log(desiredCls)
if (horizontal()){
    console.log("horizontal")
    createHorizontalContentfulBlock()
    const el = document.getElementsByTagName('p')[0]
move(el, 5)}
    else{
        console.log("vertical")
        createVerticalContentfulBlock()
        const el = document.getElementsByTagName('p')[0]
move(el, 5)}




}

module.exports = { simulateCls }