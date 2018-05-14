/**
ES5中模拟参数默认值
*/
function makeRequest(url, timeout, callback){
  timeout = timeout || 2000
  callback = callback || function () {}
}

/**
如果timeout = 0，则此时，timeout 会被更改为2000，修改如下
*/

function makeRequest1 (url, timeout, callback) {
  timeout = (typeof timeout !== 'undefined') ? timeout : 2000
  callback = (typeof callback !== 'undefined') ? callback : function () {}
}

/**
ES6中的参数默认值 ：使用初始化形式：如果默认值在函数调用的时候被赋值，则默认值不会被使用
*/

function makeRequest2 (url, timeout = 2000, callback = function () {}) {

}

function makeRequest3(url, timeout=2000, callback){}

makeRequest2('/foo')
makeRequest2('/foo', 500)
//使用默认的timeout
makeRequest3('/foo', undefined, function (body) {
  // do something
})
//不使用默认的timeout. null值被认为是有效的
makeRequest3('/foo',null, function (body) {
  // do something
})

/**
参数默认值影响argumens对象
*/

/**
ES5中：非严格模式下，arguments对象总是会被更新以反映出具名参数的变化。
因此当first、second参数改变时，arguments[0],arguments[1]也相应的更新了
ES5 ：严格模式下，arguments 对象的混乱情况被消除了，不再反映出具名参数的变化
*/

function mixArgsES5(first, second) {
  console.log(arguments)
  console.log(first === arguments[0])   // true
  console.log(second === arguments[1])  // true
  first = 'c'
  second = 'd'
  console.log(arguments)
  console.log(first === arguments[0])   // true
  console.log(second === arguments[1])   // true
}
// mixArgsES5(1,2)

function mixArgsES5Stri(first, second) {
  "use strict"
  console.log(arguments)
  console.log(first === arguments[0])   // true
  console.log(second === arguments[1])  // true
  first = 'c'
  second = 'd'
  console.log(arguments)
  console.log(first === arguments[0])  // false
  console.log(second === arguments[1])  // false
}
// mixArgsES5Stri(1,2)

/**
ES6：使用ES6默认参数值的函数中，arguments对象的表现总是会与ES5的严格模式下一致。
无论此时函数是否运行在严格模式下。
参数默认值的存在触发了arguments对象与具名参数的分离
*/
function mixArgsES6(first, second='b') {
  console.log(arguments)
  console.log(arguments.length)
  console.log(first === arguments[0])  // true
  console.log(second === arguments[1]) // false
  first = 'c'
  second = 'd'
  console.log(arguments)
  console.log(first === arguments[0])  // false
  console.log(second === arguments[1])  //false
}
// mixArgsES6('a')

/**
参数默认值特性：默认值并不要求一定是基本类型的值。例如：可以执行一个函数来产生参数的默认值
引用其他参数来为参数进行默认赋值时，仅允引用前方的参数，因为，前面的参数不能访问后面的参数
*/
// let value = 5
function getValue(value) {
  return value+5
}

function add(first, second= getValue(first)) {
  return first + second
}

// console.log(add(1,1))
// console.log(add(1))
// console.log(add(1))

function getValue2(first = second, second) {
  return first+second
}
// console.log(add(1,1))
// console(undefined,2)    //抛出错误

/**
参数默认值的TDZ：函数的每个参数都会创建一个新的标识符绑定，在初始化之前不允许被访问，否则会抛出错误。
参数初始化会在函数被调用时进行，无论是给参数传递一个值、还是使用了参数的默认值
*/

/**
ES5中的不具名参数：
*/
function pick(object) {
  let result = Object.create(null)
  let len=arguments.length;
  for(let i=1;i<len;i++){
    result[arguments[i]] = object[arguments[i]]
  }
  return result
}

let book = {
  title: 'Understanding ES6',
  author: 'Nicholas C. Zakas',
  year: 2015
}
// let bookData = pick(book,'author','year')
// console.log(bookData.author)

/**
ES6的剩余参数：剩余参数与arguments互不影响。arguments对象在函数被调用时反映了传入的参数
限制条件：
  1.不能在剩余参数后使用具名参数
  2.不能在对象字面量的setter属性中使用，
  2.setter中不能使用剩余参数原因：setter被限定只能使用单个参数
*/
function pickEs6(object, ...keys) {
  let result = Object.create(null)
  let len=keys.length;
  for(let i=0;i<len;i++){
    result[keys[i]] = object[keys[i]]
  }
  return result
}
let bookData = pickEs6(book,'author','year')
// console.log(bookData.author)

// function pickEs61(object, ...keys, last) {     //语法错误，不能在剩余参数后使用具名参数
//   let result = Object.create(null)
//   let len=keys.length;
//   for(let i=0;i<len;i++){
//     result[keys[i]] = object[keys[i]]
//   }
//   return result
// }
// pickEs61(book)
// let object1 = {
//   set name (...value)   // 语法错误，不能在setter中使用生育参数
// }

function checkArgs(...args) {
  console.log(args.length)
  console.log(arguments.length)
  console.log(args[0],arguments[0])
  console.log(args[1],arguments[1])
}
checkArgs([1,2,[4,5]])

/**
函数构造器的增强能力:
Function :构造器允许你动态创建一个新函数，但在js中不常用。
传给构造器的参数都是字符串，它们就是目标函数的参数与函数体。例如：

ES6:增加了Function构造器的能力。允许使用默认参数以及剩余参数。
*/
var add = new Function("first", "second", "return first + second")

// console.log(add(1,1))

// ES6 ---默认参数
var add1 = new Function("first", "second=first", "return first + second")
// console.log(add1(1,1))
// console.log(add1(1))

//ES6 --- 剩余参数
var pickFirst = new Function("...args", "return args[0]")
// console.log(pickFirst(1,2))

/**
扩展运算符（...）：与剩余参数关联密切
剩余参数：允许把多个独立的参数合并到一个数组中
扩展运算符：允许将一个数组分割，并将各个项作为分离的参数传给函数。
例如：Math.max():不允许传入数组，只能穿入两个值
*/

// ES5
let value1 = 25
let value2 = 50
// console.log(Math.max(value1,value2))
// 因为，Math.max()不能穿入数组，所以，可以用apply
let values = [20,35,56,23,340]
// console.log(Math.max.apply(Math,values))

// ES6的扩展运算符，可以解决上述问题，无需调用apply（）：
// 可以将数组，作为剩余参数那样，传递给函数:JS引擎会将数组分割为独立参数并传递给函数
/**
可以将扩展运算符与其他参数混用:
假设：想让Math.max()返回的最小值为0（以防数组中混入了负值），可以将）单独传入，并继续为其他参数适用扩展运算符
*/

let values1 = [-20,-35,-56,-23,-340]
console.log(Math.max(...values))
console.log(Math.max(...values1,0))

/**
我的理解：
剩余参数与扩展运算符的区别：应用位置不同
1.剩余参数用在函数定义上
2.扩展运算符用在函数调用上
*/

/**
ES6给所有函数添加了 name 属性
匿名函数的 name 属性在FireFox 与 Edge 中不被支持
*/

function doSomething() {
  // body...
}
var doAnotherThing = function () {
  // body...
}

// console.log(doSomething.name)
// console.log(doAnotherThing.name)

var doSomething = function doSomethingElse() {
  // body...
}
var person = {
  get firstName() {
    return 'Nicholas'
  },
  sayName: function () {
    console.log(this.name)
  }
}

// console.log(doSomething.name)   // "doSomethingElse"
// console.log(person.sayName.name)   //"sayName"

// var descriptor = Object.getOwnPropertyDescriptor(person, "firstName")
// console.log(descriptor .get.name)  // "get firstName" :表明是getter属性。
// getter、setter属性必须用 Object.getOwnPropertyDescriptor() 来判断

// console.log(doSomething.bind().name)  //  "bound doSomething"
// console.log((new Function()).name)    //  "anonymous"


/**
明确函数的双重作用：
ES5: 函数根据是否适用 new 来调用而有双重用途。
使用 new 时，函数内部的 this 是 一个 新对象， 并作为函数的返回值
例如：Person 首字母大写，是指示其应当使用 new 来调用的唯一标识
*/

/**
JS:为函数内部提供两个 [[Call]]  和  [[Construct]]
[[call]]：当函数未使用 new 进行调用时,执行，运行的是代码中显示的函数体
[[construct]] : 当函数使用 new 进行调用时，执行，负责创建一个被称为 新目标 的新的对象，并且使用该新目标作为 this 去执行函数体。
拥有 [[construct]] 方法等函数被称为构造器
*/

/**
1. 并不是所有的函数都有 [[Construct]] 方法， 因此不是所有函数都可以用 new 来调用
2. “箭头函数” 没有 [[Construct]] 方法
*/

function Person(name) {
  this.name = name
}

var person = new Person('Nicholas')
var notAPerson = Person('Nicholas')
// console.log(person)        // Person {name: 'Nicholas'}
// console.log(notAPerson)    //  undefined :因为不使用 new 调用时 没有返回值

// ES5 ：判断函数如何被调用： 使用 instanceof。 例如：
/**
使用 instanceof 对 this 值来判断 是否为构造器的一个实例：
1:若是，正常继续执行。
2:不是：抛出错误。
3。这样做的原因： [[Construct]]方法创建了Person 的一个新实例，并将其赋值给this。
*/
function Person1 (name) {
  if(this instanceof Person1) {
    this.name = name
  } else {
    throw new Error('You must use new with Person')
  }
}
var person1 = new Person1('Nicholas')
// console.log(person1)
// var notAPerson1 = Person1('Nicholas')   //抛出错误
/**
但是：上述方法不可靠。：因为：在不使用 new 的情况下 this 仍然可能是 Person 的实例。例如：
*/

function Person1 (name) {
  if(this instanceof Person1) {
    this.name = name
  } else {
    throw new Error('You must use new with Person')
  }
}
var person1 = new Person1('Nicholas')
// console.log(person1)
var notAPerson1 = Person1.call(person1, 'Nicholas')   // 可以
/**
调用 Person.call() 并将 person 变量作为第一个参数传入，这意味着将 Person 内部的 this 设置了 person。
*/

/**
ES6: new.target 元属性
1.元属性： 指的是 “非对象” （例如 new ）上的一个属性，并提供关联到它的目标的附加信息
2.当函数的 [[Construct]] 方法被调用时， new.target 会被填入 new 运算符的作用目标，
  该目标通常是 新创建的对象实例的构造器，并且会成为函数体内部的 this 值。
  若 [[call]] 被执行，new.target 的值则会是 undefined
3.通过检查 new.target 是否被定义， 能安全的判断，函数是否被使用 new 进行了调用
*/

function Person2(name) {
  if(typeof new.target !== "undefined") {
    this.name = name
  }else {
    throw new Error ('You must use new with Person2')
  }
}

var person2 = new Person2('Nicholas')
// var notAPerson2 = Person2.call(person2, 'Nicholas')   //出错
// console.log(person2)
// console.log(notAPerson2)

//注意：使用 new.target 而非 this instanceof Person2 ，Person2 构造器会在使用 new 调用时正确地抛出错误
// 在函数之外使用 new.target  会有语法错误
// 还可以使用 new.target 是否被使用特定构造器 进行了调用，例如：

function Person3(name) {
  if(new.target === Person3){
    this.name = name
  } else {
    throw new Error('You must use new with Person3')
  }
}

function  AnotherPerson(name) {
  Person3.call(this, name)
}

var person3 = new Person3('Nicholas')

// var anotherPerson3 = new AnotherPerson('Nicholas')    // 出错

/**
ES6 ：在代码块内声明函数
最佳实践：不要在代码块中声明函数（更好的选择是使用函数表达式）
块级函数
*/

"use strict"
if(true) {

  //ES5 严格模式下会抛出错误，ES6 不会
  function doSomething() {
    // body...
  }
}

// 上述代码中：ES6不会抛出错误。 ES6会将dosomething（）函数视为块级声明，并允许它在所定义的代码块内部被访问
//例如：ES6
/**
块级函数： 会被提升到定义所在的代码块的顶部，（说白了，就是，包含块级函数的最近一层的{} 中，）
因此，使用 typeof dosomething10, 会返回“function”，
if代码块执行完毕，dosomething10（）也就不复存在，所以在外层，使用 typeof dosomething10，会返回 undefined
*/

"use strict"
if(true) {
  // console.log(typeof doSomething10)   // 'function'
  function doSomething10() {
    // body...
  }
  doSomething10()
}
// console.log(typeof doSomething10)   // 'undefined'


/**
决定何时使用块级函数？
1. 块级函数与let 函数表达式相似，在执行流跳出定义所在的代码块之后，函数定义就会被移除
2.区别：块级函数会被提升到所在代码块的顶部，而使用let的函数表达式则不会。
例如：
*/
"use strict"
if(true) {
  // console.log(typeof doSomething5)  // 抛出错误
  let doSomething5 = function () {
    // body...
  }
  doSomething5()
}
// console.log(typeof doSomething5)   // undefined

/**
非严格模式下的块级函数
ES6 在非严格模式下 同样允许使用块级函数，
但是，块级函数的作用域会被提升到 所在函数 或 全局环境 的顶部，而不是代码块的顶部
*/

// ES6 behavior
if(true) {
  // console.log(typeof doSomething6)   //function
  function doSomething6() {
    // body...
  }
  doSomething6
}
// console.log(typeof doSomething6)   //function




/**
箭头函数：特点
1. 没有 this、 super、 arguments，也没有 new.target 绑定： this、 super、 arguments、 以及函数内部的new.target 的值由所在的、最靠近的非箭头函数来决定
2.不能使用new 调用。箭头函数 没有 [[Construct]] 方法，因此不能被用为构造函数，使用new 会抛出错误
3.没有原型， 既然不能 对箭头函数 使用 new ，那么它不需要原型，也就没有 prototype属性
4.不能更改 this 。this的值 在函数内部不能被修改，在函数的整个生命周期内其值会保持不变,所以，不能使用 call()、apply()、bind()修改其this值
5.没有argumnents 对象，所以，箭头函数，必须依赖于 具名参数 或剩余参数来访问函数的参数
6.不允许重复的具名参数：
*/

// 使用传统函数：
// (function(){/*函数体*/})() 
// 或者
// (function () {/*函数体*/} ())

// 使用箭头函数
// (() => {/*函数体*/})() 

// 没有this值带来的错误
var PageHandler = {
  id: '123456',
  init: function () {
    document.addEventListener('click',function (event) {
      this.doSomething(event.type)   //错误
    },false)
  },
  doSomething: function (type) {
    console.log("Handling " + type + " for " +  this.id)
  }
}
//修改：使用bind
var PageHandler = {
  id: '123456',
  init: function () {
    document.addEventListener('click',(function (event) {
      this.doSomething(event.type)   //错误
    }).bind(this), false)
  },
  doSomething: function (type) {
    console.log("Handling " + type + " for " +  this.id)
  }
}

//使用箭头函数
var PageHandler = {
  id: '123456',
  init: function () {
    document.addEventListener('click',
      event => this.document(event.type),false)
  },
  doSomething: function (type) {
    console.log("Handling " + type + " for " +  this.id)
  }
}

// 没有arguments绑定，但是可以访问包含它的函数的arguments对象
function createArrowFunctionReturningFirstArg() {
  return () => arguments[0]
}
var arrowFunction = createArrowFunctionReturningFirstArg(5)
// console.log(arrowFunction())

/**
ES6： 引擎优化
尾调用：tail call
尾调用：指的是调用函数的语句，是在另一个函数的最后语句
例如：
尾调用优化的条件：
1.尾调用不能引用当前栈帧中的变量（意味着该函数不能是闭包）,使用闭包，会导致 尾调用优化被关闭
2.进行尾调用的函数在尾调用返回结果后不能做额外操作
3.尾调用的结果作为当前函数的返回值
*/

"use strict"
function doSomething4() {    //满足上述3个条件，可以被优化
   return doSomethingElse()
}

function doSomething4() {    //不满足上述第2个条件，不可以被优化
   return 1 + doSomethingElse()
}


function doSomething4() {    //不满足上述第3个条件，不可以被优化
   var result =  doSomethingElse()
   return result
}

/**
如何控制尾调用优化？
1.实践中，尾调用优化在后台中进行，所以不必对此考虑太多，除非要尽力去优化一个函数
2.尾调用优化的主要用例：递归函数。
例如：
*/
function factorial(n) {
  if(n<=1){
    return 1
  }else {
    // 未被优化：在返回之后还要执行乘法
    return n * factorial(n-1)
  }
}

// ES6:尾调用优化：

function factorial (n, p=1){
  if(n <= 1) {
    return 1
  }else {
    let result = n * p

    //被优化
    return factorial(n-1, result)
  }
}






















