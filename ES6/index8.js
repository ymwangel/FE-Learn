/**
第八章：迭代器与生成器
*/

/**
迭代器：用于：迭代的对象，带有特定的接口
所有的迭代器对象都有 next（)方法，会返回一个结果对象obj。
obj 有两个属性
  1. 对应下一个值的value。
  2.一个布尔类型的 done，其值为true时表示没有更多值可供使用

迭代器，持有一个指向集合位置的内部指针，每当调用了next（）方法，迭代器就会返回相应的下一个值

若在最后一个值返回后调用next（），所返回的done属性值会是true，并且value属性值会是迭代器自身的返回值。
该“返回值”不是原始数据集的一部分，却会成为相关数据的最后一个片段，或者迭代器未提供返回值的时候使用undefined。
迭代器自身的返回值类似于函数的返回值，是向调用者返回信息的最后手段
*/

/**
生成器（generator)：
能返回一个迭代器的函数
1.生成器函数，由放在 function 关键字之后的一个 * 号来表示，
2.并使用新的yield关键字，
3.yield关键字：ES6新增，指定了迭代器在被next（）方法调用时应当按顺序返回的值
4.生成函数：会在每个yield语句后停止执行。
5:例如：yield 1 执行后，该函数将不会再执行任何操作，直到迭代器的next（）方法被调用，此时，才继续执行yield 2.
6.yield。关键字可以和值或是表达式一起使用
7. yield关键字只能用在生成器内部。用在其他任意位置都报错：语法错误，即使在生成器内部的函数中也不行，yield无法穿越函数边界
*/

// ES5创建一个迭代器

function createIterator(items) {
  var i=0;
  return {
    next: function () {
      var done = (i >= items.length)
      var value = !done ? items [i++] : undefined
      return {
        done: done,
        value: value
      }
    }
  }
}
// var iterator = createIterator([1,2,3])
// console.log(iterator.next())  // {done:false,value:1}
// console.log(iterator.next())  // {done:false,value:2}
// console.log(iterator.next())  // {done:false,value:3}

// console.log(iterator.next())  // {done:true,value:undefined}

// ES6
function *createIterator() {
  yield 1;
  yield 2;
  yield 3;
}
// let iterator = createIterator()
// console.log(iterator.next().value)  //1
// console.log(iterator.next().value)  //2
// console.log(iterator.next().value)  //3
// console.log(iterator.next().value)  //undefined

function *createIterator(items) {
  for(let i = 0; i< items.length; i++){
    yield items[i]
  }
}
// let iterator = createIterator([1,2,3])
// console.log(iterator.next())  // {done:false,value:1}
// console.log(iterator.next())  // {done:false,value:2}
// console.log(iterator.next())  // {done:false,value:3}
// console.log(iterator.next())  // {done:true,value:undefined}

// console.log(iterator.next())   // {done:true,value:undefined}

// 匿名的生成器函数
let iterator = function *(items) {
  for(let i = 0; i< items.length; i++){
    yield items[i]
  }
}

/**
迭代对象（iterable）：包含Symbol.iterator属性的对象。
1.Symbol.iterator：知名符号：定义了为指定对象返回迭代器的函数。
2.ES6:在所有的集合对象（数组、Set、Map）以及字符串都是可迭代对象，因此它们都被指定了默认的迭代器。
3.可迭代对象：用于与ES新增的for-of 循环配合使用
4.生成器创建的所有迭代器都是可迭代对象，因为生成器默认久会为Symbol.iterator属性赋值
5.for-of 循环
    （1）：在循环每次执行时都会调用可迭代对象的next（）方法，并将结果对象的value值存储在一个变量上。
    （2）：循环过程会持续到结果对象的done属性变为true为止。
*/
let values = [1,2,3]
for(let num of values) {
  console.log(num)
}
/**
for-of循环：
1.首先调用了values数组的Symbor.iterator方法，获取了一个迭代器（对Symbor.iterator的调用发生在JS引擎后台）
2.接下来，iterator.next（）被调用，迭代器对象的value属性被读出并放入了num变量。
3.num变量的值开始为1，然后时2，3
4.当结果对象的done为true是，循环就退出了，因此num绝不会被赋值为undefined
5.在不可迭代对象、null或undefined上使用for-of语句，会抛出错误
*/
// 使用Symbol.iterator来访问对象上的默认迭代器，
let iterator = values[Symbol.iterator]()    //获取了一个默认迭代器对象（for-of循环第一条）
console.log(iterator.next()) //{value:1,done:false}
console.log(iterator.next()) //{value:2,done:false}
console.log(iterator.next()) //{value:3,done:false}

console.log(iterator.next()) //{value:undefined,done:false}

// 使用Symbol.iterator检测一个对象是否能进行迭代：
function isIterable(object) {
  return typeof object[Symbol.iterator] === 'function'
} 
console.log(isIterable[1,2,3])   //true
console.log(isIterable("hello"))  //true
console.log(isIterable(new Map())) //true
console.log(isIterable(new Set())) //true
console.log(isIterable(new WeakMap()))  //false
console.log(isIterable(new WeakSet()))  //false
// WeakMap,WeakSet不可枚举

// 使用Symbol.iterator创建可迭代对象：
/**
1.可以创建一个包含生成器的Symbol.iterator属性，让不可迭代对象编程可迭代对象
*/
let collection = {
  items: [],
  *[Symbol.iterator](){
    for(let item of this.items){
      yield item
    }
  }
}

collection.items.push(1)
collection.items.push(2)
collection.items.push(3)
for(let x of collection){
  console.log(x)
}

/**
内置的迭代器
ES6具有三种集合对象类型：数组、Map、Set，三种类型都有如下迭代器
1.entries()：返回一个包含键值对的迭代器
2.values（）：返回一个包含集合中的值的迭代器
3.keys（）：返回一个包含集合中的键的迭代器
以上三个迭代器，对于数组，entries()、keys(),Chrome支持，但是values（),Chrome不支持
*/
let colors = ["red","green","blue"]
let tracking = new Set([1234,5678,9012])
let data = new Map()
data.set("title","Understanding ES6")
data.set("format","ebook")

for(let entry of colors.entries()){
  console.log(entry)
}
for(let entry of tracking.entries()){
  console.log(entry)
}
for(let entry of data.entries()){
  console.log(entry)
}

for(let value of colors.values()){
  console.log(value)
}
for(let value of tracking.values()){
  console.log(value)
}
for(let value of data.values()){
  console.log(value)
}

for(let key of colors.keys()){
  console.log(key)
}
for(let key of tracking.keys()){
  console.log(key)
}
for(let key of data.keys()){
  console.log(key)
}

/**
默认迭代器：使用for-of时
1.数组、Set：values（）
2.Map：entries（）
3.WeakSet 与 WeakMap 没有内置的迭代器，使用弱引用意味着无法获知这些集合内部到底有多少个值，同时也没有方法可以迭代这些值
*/
// 与使用colors.values()相同
for(let value of colors){
  console.log(value)
}
// 与使用tracking.values()相同
for(let num of tracking){
  console.log(num)
}
// 与使用data.entries()相同
for(let entry of data){
  console.log(entry)
}

// 解构与for-of循环
/**
Map默认迭代器的行为有助于在for-of循环中使用解构
*/

let data = new Map()
data.set('title',"Understanding ES6")
data.set("format","ebook")
// 与使用data.entries()相同
for(let [key,value] of data){
  console.log(key + '=' + value)
}

// 扩展运算符与非数组的可迭代对象
// 扩展运算符，可用在任意可迭代对象上，就成为了可迭代对象转换为数组的最简单方式
let set = new Set([1,2,3,3,3,4,5])
let array = [...set]
console.log(array)
let map = new Map(["name","Nicholas"],["age",25])
let array1 = [...map]
console.log(array1)
// 可以无限次地在数组字面量中使用扩展运算符，而且可以在任意位置用扩展运算符将可迭代对象的多个项插入数组，这些项在新数组中将会出现在扩展运算符对应的位置
let samllNumbers = [1,2,3]
let bigNumbers = [100,101,102]
let allNumbers = [0, ...samllNumbers, ...bigNumbers]
console.log(allNumbers.length)
console.log(allNumbers)

/**
传递参数给迭代器
迭代器的next（value）
1.对于next（）的首次调用是一个特殊情况，传给它的任意参数都会忽略。
2.传递给next（）的参数会成为yield语句的值，该yield语句指的是上次生成器中断执行处的语句。
3.而next()方法第一次调用时，生成器函数才刚刚开始执行，没有所谓的“上一次中断处的yield语句”可供赋值，因此，在第一次调用next（）时，不存在任何向其传递参数的理由
4.第二次调用next（）方法时，参数4，传递进去，4最终被赋值给生成器函数内部的first变量。
5.在包含赋值操作的第一个yield语句中，表达式右侧在第一次调用next（）时被计算，而表达式左侧则在第二次调用next（）方法时、并在生成器函数继续执行前被计算。
6.由于第二次调用next（）传入了4，这个值就被赋给了first变量，之后生成器继续执行
*/
function *createIterator() {
  let first = yield 1
  let second = yield first+2
  console.log(second)   //5
  yield second+3
}

let iterator = createIterator()
console.log(iterator.next())
console.log(iterator.next(4))  // 4+2
console.log(iterator.next(5))  // 5+3
console.log(iterator.next())  // {value: undefined, done: true}

// 在迭代器中抛出错误
function *createIterator() {
  let first = yield 1
  let second = yield first+2
  console.log(second)   //5
  yield second+3
}
let iterator = createIterator()
console.log(iterator.next())   //{value: 1, done: false}
console.log(iterator.next(4))   // {value: 6, done: false}
console.log(iterator.throw(new Error("Boom")))    //从生成器中抛出了错误

// 使用try-catch
function *createIterator() {
  let first = yield 1
  let second;
  try {
    second = yield first+2    // yield 4+2,然后抛出错误
  }catch (ex) {
    second = 6              // 当出错时，给变量另外赋值
  }
  yield second+3
}
let iterator = createIterator()
console.log(iterator.next())    //{value: 1, done: false}
console.log(iterator.next(4))   //{value: 6, done: false}
console.log(iterator.throw(new Error("Boom")))    //{value: 9, done: false}
console.log(iterator.next())   //{value: undefined, done: true}

// 生成器的Return语句：
/**
1.可以让生成器早一点退出执行
2.也可以指定在next（）方法最后一次调用时的返回值
*/
function *createIterator(){
  yield 1
  return
  yield 2
  yield 3
}
let iterator = createIterator()
console.log(iterator.next())   // {value:1, done: false}
console.log(iterator.next())   // {value:undefined, done:true}
function *createIterator() {
  yield 1
  return 42
}
let iterator = createIterator()
console.log(iterator.next())   // {value:1, done: false}
console.log(iterator.next())   // {value:42, done:true}
console.log(iterator.next())   // {value:undefined, done:true}

// 生成器委托
/**
将两个迭代器的值合并到一起。
如下例子：
1.此处的createCombinedIterator（）生成器依次委托了createNumberIterator（）与createColorIterator（）
2.返回的迭代器从外部看来就是一个单一的迭代器，用于产生所有的值
3.每次对next（）的调用都会委托给合适的生成器，知道使用createNumberIterator（）与createColorIterator（）创建的迭代器全部清空为止。
4.然后最终的yield（）会被执行以返回true
*/
let *createNumberIterator(){
  yield 1
  yield 2
}
let *createColorIterator(){
  yield "red"
  yield "green"
}
function *createCombinedIterator() {
  yield *createNumberIterator()
  yield *createColorIterator
  yield true
}
var iterator = createCombinedIterator()
console.log(iterator.next())    // {value:1, done: false}
console.log(iterator.next())    // {value:2, done: false}
console.log(iterator.next())    // {value:"red", done: false}
console.log(iterator.next())    // {value:"green", done: false}
console.log(iterator.next())    // {value:true, done: false}
console.log(iterator.next())    // {value:undefined, done: true}

// 生成器也能使用生成器的返回值
/**
1.使用返回值的生成器委托，是一种非常强大的范式，可应用于与异步操作结合时
*/
function *createNumberIterator() {
  yield 1
  yield 2
  return 3
}

function *createRepeatingIterator(count) {
  for(let i=0;i<count;i++){
    yield "repeat"
  }
}

function *createCombinedIterator() {
  let result =  yield *createNumberIterator()
  yield *createRepeatingIterator(result)
}
var iterator = createCombinedIterator()
console.log(iterator.next())  // {value:1, done: false}
console.log(iterator.next())  // {value:2, done: false}
console.log(iterator.next())  // {value:"repeat", done: false}
console.log(iterator.next())  // {value:"repeat", done: false}
console.log(iterator.next())  // {value:"repeat", done: false}
console.log(iterator.next())   // {value:undefined, done: true}











