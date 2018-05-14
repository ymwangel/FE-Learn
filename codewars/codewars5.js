function sumDigPow (a,b) {
  pro
}

function pro (a) {
  if(a == ''){
    return ''
  }
  var arr = (a+'').split('')
  arr.map(function(item,i) {
    return item^i
  })

}
console.log(pro(23))