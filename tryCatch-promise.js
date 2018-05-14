





'use strict'
var p = (new Promise(function (resolve, reject) {
  reject(new Error('Error from promise by reject'))
  //或者通过throw的方式抛出，效果相同
  // throw new Error('Error from promise by re throw')
}))

//或者在 then 通过 throw 抛出错误，也有同样效果

/**
var p = (new Promise(function (resolve){
  resolve('Data')
}))
.then(function (res){
  console.info('Receive:', res)
  throw new Error('Error from promise by throw')
})
*/

process.on('uncaughtException', function(e){
  console.error('UE:Catch in process', e)
})

process.on('unhandledRejection', (reason) => {
  console.info('UR:Catch in process', reason)
})

process.on('rejectionHandled', (p) => {
  console.info('RH: Catch in process', p)
})

setTimeout(function() {
  p.catch(function(e) {
    console.error('Catch in Promise', e)
  })
}, 1e3)

// 总结：
// 1. rejectionHandled事件的触发条件为，promise 没有被及时 catch 到错误并触发了 unhandledRejection 事件，
//    在这之后的一段时间里，promise 错误又被处理了，此时触发 rejectionHandled
// 2. uncaughtException 并不能捕获 Promise 内抛出的错误

