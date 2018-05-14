/*第四章：扩展的对象功能*/
//ES6: 属性初始化器的速记法
// ES5
function createPerson(name, age) {
  return {
    name: name,
    age: age
  }
}

// ES6
function createPerson(name, age) {
  return {
    name,
    age
  }
}

//ES5
var person = {
  name: 'Nicholas',
  sayName: function () {
    console.log(this.name)
  }
}

//Es6
var person = {
  name: 'Nicholas',
  sayName(){
    console.log(this.name)
  }
}

// 需计算属性名：
// ES5中： 对象实例 使用需计算的属性名，主要用方括号 来表示代替小数点表示法即可
// ES6: 方括号中 允许将变量或字符串字面量指定为属性名，而在字符串中允许存在 作为标识符 时会导致语法错误的特殊字符。
// 例如：

var person = {},
 lastName = "last name";
person["first name"] = 'Nicholas',
person[lastName] ='Zakas'

console.log(person["first name"])   //'Nicholas'
console.log(person[lastName])      // Zakas

var person = {
  "first name" : 'Nicholas'
}

// ES6
//对象字面量内的方括号 表明： 该属性名需要计算，其结果是一个字符串。也可以包含表达式
var lastName = "last name"
var suffix = " name"
var person = {
  "first name" : "Nicholas",
  [lastName]: 'Zakas',
  ["seond"+suffix]: 'lis'
}
console.log(person["first name"])  // Nicholas
console.log(person[lastName])     // Zakas

  













