/**
Promise 与异步编程
为了确保能正确处理任意可能发生的错误，应当始终在Promise链尾部添加拒绝处理函数
*/

let rejected
window.onunhandlerejection = function (event) {
  console.log(event.type) // "unhandledrejection"
  console.log(event.reason.message) // "Explosion"
  console.log(rejected === event.promise) // true
}

window.onrejectionhandled = function (event) {
  console.log(event.type)  // "rejectionhandled"
  console.log(event.reason.message) //"Explosion"
  console.log(rejected === event.promise)  // true
}

rejected == Promise.reject(new Error("Explosion"))