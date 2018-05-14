/**
解构（desstructuring）：更方便的数据访问： --- 为简化提取信息的任务
解构对象： 数组、 对象
应用：
1。应用于变量声明
2. 在赋值的时候使用解构
*/

// ES5: 从对象或数组中获取信息、并将特定数据存入本地变量
let options = {
  repeat: true,
  save: false
}
// 从对象中提取数据
let repeat = options.repeat,
  save = options.save

// ES6: 对象解构：使用对象字面量-------应用于变量声明
let node = {
  name: 'foo',
  type: 'Identifier'
}
let {type, name} = node
// console.log(type)
// console.log(name)

//解构赋值  --- 在赋值的时候使用解构
// 必须使用 () 包裹解构赋值语句
// 圆括号 () 表示： 里面的花括号，并不是块语句，而被应该解释为表达式，从而允许完成赋值操作
let node = {
  type: 'Identifier',
  name: 'foo',
  age: '23'
}
let type = 'Literal'
let name = 5;
// 使用解构来分配不同的值
({type, name} = node)
/**
({type, name} = node):解构赋值，只是，将node.type,node.name赋值给变量：type、name。
但是，最终返回的值仍然是node。
因为赋值表达式 = ，表示将node赋值给解构表达式
*/

console.log( ({type, name} = node) )    // { type: 'Identifier', name: 'foo', age: '23'}，就是node
// console.log(type)
// console.log(name)

function outputInfo(value) {
  console.log(value)  // { type: 'Identifier', name: 'foo', age: '23'}，就是node
  console.log(value === node)  // true
}
outputInfo( {type,name } = node)
console.log(type)
console.log(name)

/**
当解构赋值表达式的右侧（ = 后面的表达式）的计算结果为 null 或 undefined 时，会抛出错误
因为：任何读取 null 或者 undefined 的企图都会导致 “运行时”错误（runtime error）

使用解构赋值时，如果所指定的 本地变量 在对象中 没有找到同名属性，那么该变量 会被赋值 为 undefined
例如：
当然，也可以选择性地定义一个默认值，以便在指定属性不存在的时候使用该值。
例如：
*/

let node = {
  type: 'Identifier',
  name: 'foo'
}
let { type, name, value} = node
console.log(type)   // Identifier
console.log(name)   // foo
console.log(value)  //undefined

let {type, name, value1 = true} = node
console.log(type)   // Identifier
console.log(name)   // foo
console.log(value1)  //true

//解构的变量与对象node中的变量不同名字。例如：
let {type: localType, name: localName} = node
console.log(localType)   //Identifier
console.log(localName)  // foo

let {type: localType, name: localName = "bar"} = node
console.log(localType)   //Identifier
console.log(localName)  // bar

/**
嵌套的对象解构
*/
let node = {
  type: "Identifier",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line:1,
      column: 4
    }
  }
}
// 每当有一个冒号在解构模式中出现，就意味着 冒号之前 的标识符 代表需要检查的位置，
// 而冒号 右侧 则是赋值的目标
// 当冒号右侧存在花括号时，表示目标被嵌套在对象的更深一层中
// 空白花括号，在对象解构中时合法的，但是不会做任何事
let {loc: {}} = node
let {loc} = node 
console.log(loc) 
// {start: {line: 1,column: 1},end: {line:1,column: 4}}
let {loc: {start}} = node
let {loc: {start: localStart}} = node
console.log(start.line)  // 1
console.log(start.column)  //1
console.log(localStart.line)  // 1
console.log(localStart.column)  //1


/**
数组解构：使用嵌套的解构：小心.
数组本身并没有以任何方式改变
空白花括号，在对象解构中时合法的，但是不会做任何事
*/
let colors = ["red", "green", "blue"]
let [firstColor, secondColor] = colors
console.log(firstColor)
console.log(secondColor)

// 想获取第三个颜色的值，
// 前面两个 , 不可以省略，是为数组前面的项提供的占位符
let [, , thirdColor] = colors
console.log(thirdColor)

/**
解构赋值：
1.可以在赋值表达式中使用数组解构，但是与对象解构不同，不必将表达式包含在圆括号内
2.例如：
*/

let colors = ["red", "green", "blue"]
firstColor = 'black'
secondColor = 'purple'

[firstColor,secondColor] = node
console.log(firstColor)    // "red"
console.log(secondColor)   // “green”

/**
数组解构赋值：独特的用例：能轻易的互换两个变量的值
与对象解构赋值相同： 当 等号= 右侧当计算结果为 null 或 undefined，那么数组解构赋值表达式会抛出错误
例如：
*/
// ES5
let a = 1;
let b = 2;
let tmp
tmp = a
a = b
b = tmp
console.log(a)   // 2
console.log(b)   // 1

// ES6
/**
赋值语句左侧：（即 = 之前）的解构模式，如其他数组解构的范例
赋值语句右侧：（即 = 之后）为了互换而临时创建的数组字面量
*/
let a = 1
let b = 2
[a,b] = [b,a]
console.log(a)  // 2
console.log(b)  // 1

// 默认值：
let colors = ["red"]
let [firstColor,secondColor='green'] = colors
console.log(firstColor)  // red
console.log(secondColor)  // green

// 嵌套的数组的解构，与嵌套的对象解构类似

let colors = ["red", ["green", "lightgreen"], "blue"]

let [firstColor, [secondColor]] = colors
console.log(firstColor)  // red
console.log(secondColor) //green
let [firstColor, [, thirdColor]] = colors
console.log(thirdColor)  // lightgreen

/**
数组长度过大的解构：剩余项（类似于剩余参数）
剩余项之后，不能再有逗号（,），否则语法错误
例如：
用途：克隆数组
*/

let colors = ["red","green","blue"]
let [firstColor, ...restColors] = colors
console.log(firstColor)   // "red"
console.log(restColors.length)   // 2
console.log(restColors[0])   // green
console.log(Object.prototype.call(restColors))   // "[object Array]"

// ES5:克隆数组
var colors = ["red","green","blue"]
var clonedColors = colors.concat()
// 或者
clonedColors = colors.slice(0)

// ES6
let [...clonedColors] = colors
console.log(clonedColors)

/**
混合解构
*/
let node = {
  type: 'Identifier',
  name: 'foo',
  loc: {
    start: {
      line:1,
      column: 1
    },
    end: {
      line:1,
      column: 4
    },
    range: [0,3]
  }
}

let {
  loc: {start},
  range: [startIndex]
} = node
console.log(start.column) //1
console.log(startIndex)   //0

/**
参数解构：提供了更清楚地标明函数期望输入的替代方案。使用对象／数组解构的模式替代具名参数
*/
// 
function setCookie(name,value,options) {
  options = options || {}
  let secure = options.secure,
      path = options.path,
      domain = options.domain
      expires = options.expires;
}

setCookie("type","js", {
  secure:true,
  expires: 60000
})

// 使用参数解构
// 1.解构参数在没有传递值的时候，类似于常规参数，会被设为undefined
// 2.参数解构：拥有解构方式的所有能力，可以在其中使用默认参数、混合解构、或者使用于属性不同的变量名
// 3.怪异点：默认情况下，调用函数时未给参数解构传值 会抛出错误
function setCookie (name, value, {secure, path,domain,expires}) {

}

setCookie("type", "js", {
  secure: true,
  expires: 60000
})

// JS引擎实际上这样做的：

function setCookie(name, value, options) {
  let {secure,path,domain,expires} = options
  // 在赋值右侧的值为null或undefined时，解构会抛出错误。
}

// 例如：不给参数解构传值，会抛出错误
setCookie("type","js")

// 优化：如果解构参数时可选 的，可以将解构参数提供默认值，
function setCookie(name, value, {secure, path, domain, expires} = {}) {
  // body...
}
// 参数解构的默认值
function setCookie(name, value, 
  {
    secure = false, 
    path = "/",
    domain = "example.com", 
    expires = new Date(Date.now() + 360000000)
  } = {}
) {
  // body...
}














