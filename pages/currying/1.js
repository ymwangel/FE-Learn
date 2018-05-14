var foo = function(a) {
  return f = function(b){
    // console.log(arguments)
    // console.log(arguments.callee.toString())
    return a+b
  }
}
// console.log(foo(1)(2))

// function factorial(n){
//   return !(n>1) ? 1 : factorial(n-1)*n
// }
// console.log([1,2,3,4,5].map(factorial))

// function factorial(n){
//   return !(n>1) ? 1 : arguments.callee(n-1)*n
// }
// console.log([1,2,3,4,5].map(factorial))


function testCaller() {  
    // console.log(testCaller.toString())
    var caller = testCaller.caller;  
    // console.log(caller.toString());  
}  
  
function aCaller() {  
    testCaller();  
}  
  
aCaller();

var adder = function () {
  var _args = []
  return function(){
    if(arguments.length === 0){
      return _args.reduce(function(a,b){
        return a+b
      })
    }
    [].push.apply(_args,[].slice.call(arguments))
    return arguments.callee
  }
}   
var sum = adder();

// console.log(sum);     // Function
sum(100,200)(300)
// console.log(sum(100,200)(300));    // 调用形式灵活，一次调用可输入一个或者多个参数，并且支持链式调用
sum(400);
sum()


var currying = function(fn){
  var _args = []
  return function(){
    if(arguments.length == 0){
      return fn.apply(this,_args)
    }
    Array.prototype.push.apply(_args,[].slice.call(arguments))
    return arguments.callee
  }
}

var totop = (function(){
  //返回顶部
  var isFF = /firefox/i.test(navigator.userAgent)
  var docEl = document[isFF?'documentElement':'body']
  return function(){
    docEl.scrollTop = 0
  }
})()

//函数节流：原理：定时器。让一个函数无法在短时间内连续调用，只有当上一次函数执行后过了规定的时间间隔，才能执行下一次改函数的调用
//应用：例如：按钮的点击

function throttle(fn,context) {
  clearTimeout(fn.tId)
  fn.tId = setTimeout(function() {
    fn.call(context)
  },100)
}

// impress用的封装：
var throttle = function(fn,delay) {
  var timer = null
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context,args)
    },delay)
  }
}


















