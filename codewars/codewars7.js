// 求n！ --7kyu
var fibfn = memozi(function(n){
    return n == 0 ? 1 : n * fibfn(n-1)
})

function memozi(fn) {
  var r = {}
  return function (n) {
    if(r[n] == null){
      r[n] = fn(n)
    }
    return r[n]
  }
}

var factorial = memozi(function (n) {
  return n == 0 ? 1 : n * factorial(n-1)
})
console.log(factorial(13))


