// persistence(39) === 3 
// because 3*9 = 27, 2*7 = 14, 1*4=4
// and 4 has only one digit
// 经历了3次运算
function  persistence (num) {
  var arr = (num+'').split('')
  return arr.length == 1 ? num : persistence(arr.reduce((prev,next) => prev * next))
}

var i = 0
function persistence1 (num) {
  var arr = (num+'').split('')
  if(arr.length >1){
    i++
    persistence1(arr.reduce((prev,next) => prev * next))
  }
  return i
}
console.log(persistence1(39))