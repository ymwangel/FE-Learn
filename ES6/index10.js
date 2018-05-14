/**
增强的数组功能
创建数组：
1.Array.of() : 创建一个包含所有传入参数的数组，而不管参数的数量与类型
2.Array.from() :将非数组对象转换为数组，例如：arguments转换为数组

检索数组：
1. find（cb, this） ： 返回第一个匹配的值
2. findIndex(cb, this) ： 返回第一个匹配位置的索引

填充数组
1. fill（）：使用特定值填充数组中的一个或多个元素，当使用一个参数时，该方法会用该成熟的值填充整个数组。

赋值元素
copyWithin() ：允许在数组内部复制自身元素
*/

/**
Array.from()
1. 可用于类数组对象转换为数组
2.也可以用于迭代对象。将任意包含Symbol.iterator属性的对象转换为数组
*/

let items = Array.of(1,2)
console.log(items.length) // 2
console.log(items[0]) //1

items = Array.of(2)
console.log(items.length) //1
console.log(items[0]) //2

items = Array.of("2")
console.log(items.length) //1
console.log(items[0]) // "2"

// ES5 ：将arguments转换为数组
function makeArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}
function doSomething() {
  var args = makeArray(arguments)
  // args :数组
}
// ES6
function doSomething() {
  var args = Array.from(arguments)
}
// 映射转换
function translate() {
  return Array.from(arguments, (value) => value + 1)
}
let numbers = translate(1,2,3) // [2,3,4]

// 指定映射函数内部的this值
// 使用helper.add()作为映射函数，该函数中使用了this.diff属性，所以，必须制定this
let helper = {
  diff: 1,
  add(value) {
    return value + this.diff
  }
}
function translate() {
  return Array.from(arguments, helper.add , helper)
}
let numbers = translate(1,2,3)
console.log(numbers) // [2,3,4]


// Array.from() 迭代对象
let numbers = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
}
let numbers2 = Array.from(numbers, (value)=>value + 2)
console.log(numbers2) // [3,4,5]

let numbers = [25,30,35,40,45]
console.log(numbers.find(n => n>33))  // 35
console.log(numbers.findIndex( n => n>33)) //2

// fill（）
let numbers = [1,2,3,4]
numbers.fill(1)
console.log(numbers.toString()) // 1,1,1,1

let numbers = [1,2,3,4]
numbers.fill(1,2)  // 1,2,1,1
console.log(numbers.toString()) // 1,2,1,1
numbers.fill(0,1,3) 
console.log(numbers.toString()) // 1,0,0,1

// copyWithin()
let numbers = [1,2,3,4]
// 从索引2的位置开始粘贴
// 从数组索引0的位置开始复制数据
numbers.copyWithin(2,0)
console.log(numbers.toString()) // 1,2,1,2

let numbers = [1,2,3,4]
// 从索引2的位置开始粘贴
// 从数组索引0的位置开始复制数据
// 从遇到索引1时停止复制
numbers.copyWithin(2,0,1)
console.log(numbers.toString()) //1,2,3,4

/**
类型化数组

*/












