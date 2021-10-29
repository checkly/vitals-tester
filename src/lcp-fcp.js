function showFCPBox(){
    const p = document.createElement('p')
    p.textContent='a'
  var el = document.getElementById('content').appendChild(p)
}
function showLCPBox() {
    const p = document.createElement('p')
    p.textContent='hisadfsafasdfsdafsdafsdafdsafsdafds'
  var el = document.getElementById('content').appendChild(p)
  
}
module.exports = {showFCPBox, showLCPBox}