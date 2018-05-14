// narcissistic(value)--8kyu
// 例如： 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153。   5^3:表示5的3次幂

function narcissistic(value) {
  var arr = (value+'').split('')
  if(arr.length == 1){
    return true
  }
  return value == arr.map(item => Math.pow(item,arr.length)).reduce((prev,next)=> prev + next)
}

console.log(narcissistic(370))