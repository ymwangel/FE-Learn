function getValue(condition) {
  if(condition) {
    var value = 'blue'
    return value
  }else {
  console.log(value)

    return null
  }
}
function getValue1(condition) {
  if(condition) {
    let value = "blue"
    return value
  }else {
    console.log(value)
    return null
  }
}

/**
  const 阻止的是对于变量绑定的修改，而不阻止成员值的修改
*/

// console.log(getValue(false))
// console.log(getValue1(true))
// console.log(getValue1(false))
const person = {
  name: 'lisi'
}
person.name = 'zhangsan'
person.age = '23'
// console.log(person.age)
// console.log(person.name)

/**
TDZ:临时死区 :描述由 let 或 const 声明的变量在声明处之前无法访问。
let 或 const 时会将生命放在暂时性死区，任何在暂时性死区内访问变量的企图都会导致“运行时”错误
只有执行到变量的声明语句时，该变量才会从暂时性死区内被移除并可以安全使用
*/
// if(true) {
//   console.log(typeof value)    //报错
//   let value = "blue"
// }

console.log(typeof value)    //undefined
if(true) {
  let value = "blue"
}

for(var i=0; i<10; i++) {
  void null
}
console.log(i)

for(let j=0;j<10;j++){
  void null
}
// console.log(j)      //报错

var funcs = []
for(var i=0;i<5;i++){
  funcs.push(function(){console.log(i)})
}
funcs.forEach(function(func){
  func()
})

for(var i=0;i<5;i++){
  funcs.push((function(value){
    return function(){
      console.log(value)
    }
  }(i)))
}

funcs.forEach(function(func){
  func()
})

var object = {
  a: true,
  b: true,
  c: false
}

for(let key in object) {
  funcs.push(function () {
    console.log(key)
  })
}
funcs.forEach(function(func){
  func()
})

// var RegExp = 'hello'
// console.log(window.RegExp)
// let RegExp = 'hello'
// console.log(RegExp)
// console.log(window.regRegExp == RegExp)

// const ncz = 'hi'
// console.log(ncz)
// console.log(ncz in window)



