
   const intViewportHeight = document.documentElement.clientHeight
   const intViewportWidth = document.documentElement.clientWidth

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

function move(){
    window.setTimeout(()=>{
   
    
        const p = document.getElementsByTagName('p')[0]
            
            
            if (!horizontal())
            p.style.left = getPercent(5)
            else 
            p.style.top = getPercent(5)
            
            window.setTimeout(()=>{
           
            
                const p = document.getElementsByTagName('p')[0]
                    
            
                    //p.style.top = 1600+'px'
                }, 500)
        }, 1000)
}

function simulateCls(desiredCls) {
    console.log(desiredCls)
if (horizontal()){
    console.log("horizontal")
    createHorizontalContentfulBlock()
    
move()}
    else{
        console.log("vertical")
        createVerticalContentfulBlock()
        
move()}




}

module.exports = { simulateCls }