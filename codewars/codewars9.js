// curry只应用于固定个数的参数
// 实现valueOf()
function add(n){
  let sum = n
  function _fn(a){
    sum += a
    return _fn
  }
  _fn.valueOf = function () {
    return sum
  }
  return _fn
}
console.log(add(1)(2)(9))

// _fn.valueOf 调用