/**
代理与反射借口
代理（Proxy）：代理是一种封装，能够拦截并改变JS引擎的底层操作。
通过使用new Proxy()：可以创建一个代理用来替代另一个对象（被称为目标），这个代理对目标对象进行了虚拟，因此该代理与该目标对象表面上可以被当作同一个对象来对待
代理：允许拦截在目标对象上的底层操作，而这原本是JS引擎的内部能力，拦截行为使用了一个能够响应特定操作的函数（被称为陷阱）

被 Reflect 对象所代表的反射接口，是给底层操作提供默认行为的方法的集合，这些操作是能够被代理重写的。
每个代理陷阱都有一个对应的反射方法，每个方法都与对应的陷阱函数同名，并且接收的参数也与之一致。

每个陷阱函数都可以重写JS对象的一个特定内置行为，允许你拦截并修改它。
如果仍然需要使用原先的内置行为，则可食用对应的反射接口方法。
一旦创建了代理，就能清晰了解代理与反射接口之间的关系，


创建代理：
1.使用Proxy创建代理时，需传递两个参数：目标对象、一个处理器（handler），handler：定义了一个或多个陷阱函数的对象。
2.如果未提供陷阱函数，代理会对所有操作采取默认行为。
3.为创建一个仅进行传递的代理，需要使用不包含任何陷阱函数的处理器
*/

/**
proxy对象将所有操作直接传递给target对象。
当proxy.name属性被赋值为“proxy” 时，target.name 属性也同时被创建，代理对象proxy自身其实并没有存储该属性，它只是简单将赋值传递给target属性。
proxy.name 与target.name的属性值总是相等，因为它们都指向target.name。
因为：缺少陷阱函数，所以这个代理没什么用
*/

let target = {}
let proxy = new Proxy(target,{})

proxy.name = "proxy"
console.log(proxy.name)
console.log(target.name)

target.name = "target"
console.log(proxy.name)
console.log(target.name)

/**
使用set陷阱函数验证属性值
*/
let target = {
  name: "target"
}
let proxy = new Proxy(target,{
  set(trapTarget, key, value, receiver) {
    if(!trapTarget.hasOwnProperty(key)) {
      if(isNan(value)) {
        throw new TypeError("Property must be a number")
      }
    }
    return Reflect.set(trapTarget, key, value, receiver)
  }
})
// 添加一个新属性
proxy.count = 1
console.log(proxy.count)
console.log(target.count)

proxy.name = "proxy"
console.log(proxy.name)
console.log(target.name)

proxy.anotherName = "proxy"   // 抛出错误

// 使用get陷阱函数进行对象外形验证
/**
对象外形（Object Shape):指的是对象已有的属性与方法的集合，JS引擎使用对象外形来进行代码优化，经常会创建一些类来表示对象。
*/
let target = {}
console.log(target.name) //undefined

// get陷阱函数
let proxy = new Proxy({}, {
  get(trapTarget, key, receiver) {
    if(!(key in receiver)){
      throw new TypeError("Property " + key + " doesn't exist")
    }
    return Reflect.get(trapTarget, key, receiver)
  }
})

proxy.name = "proxy"
console.log(proxy.name)  //"proxy"
console.log(proxy.name) // 抛出错误

// 使用has 陷阱函数隐藏属性, 会在使用in 运算符的情况下被调用，并且会被传入两个参数
let target = {
  name: "target",
  value: 42
}
let proxy = new Proxy(target, {
  has(trapTarget, key) {
    if(key === "value"){
      return false
    }else {
      return Reflect.has(trapTarget, key)
    }
  }
})

console.log("value" in proxy)  //false
console.log("name" in proxy) // true
console.log("toString" in proxy) //true

// 使用deleteProperty 陷阱函数避免属性被删除

let target = {
  name: "target",
  value: 42
}
// 使用delete运算符，在严格模式下，删除一个不可配置的属性，会抛出错误；非严格模式下只是单纯返回false
Object.defineProperty(target, "name", {configurable: false})
console.log("value" in target) // true
let result1 = delete target.value
console.log(result1)  // true
console.log("value" in target) //false
let result2 = delete target.name
console.log(result2)

// deleteProperty 陷阱函数会在使用delete 运算符去删除对象属性时被调用，
let target = {
  name: "target",
  value: 42
}
let proxy = new Proxy(target, {
  deleteProperty(trapTarget, key) {
    if(key === "value") {
      return false
    }else {
      return Reflect.deleteProperty(trapTarget, key)
    }
  }
})

console.log("value" in proxy) //true
let result1 = delete proxy.value
console.log(result1) // false

console.log("value" in proxy)  //true

console.log("name" in proxy) // true
let result2 = delete in proxy.name
console.log(result2) // true

// 原型代理的陷阱函数

let target = {}
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    return null
  },
  setPrototypeOf(trapTarget, proto){
    return false
  }
})

let targetProto = Object.getPrototypeOf(target)
let proxyProto = Object.getPrototypeOf(proxy)
console.log(targetProto === Object.prototype)  // true
console.log(proxyProto === Object.prototype) // false
console.log(proxyProto) // null

// 成功
Object.setPrototypeOf(target,{})

// 抛出错误
// 由于setPrototypeOf陷阱函数的存在，使用proxy则会引发错误
Object.setPrototypeOf(proxy,{})

// 如果想在两个陷阱函数中使用默认行为，只需调用Reflect对象上的相应方法
let target = {}
let proxy = new Proxy(target, {
  getPrototypeOf(trapTarget) {
    return Reflect.getPrototypeOf(trapTarget)
  },
  setPrototypeOf(trapTarget,proto){
    return Reflect.setPrototypeOf(trapTarget,proto)
  }
})

let targetProto = Object.getPrototypeOf(target)
let proxyProto = Object.getPrototypeOf(proxy)

console.log(targetProto === Object.prototype)  //true
console.log(proxyProto === Object.prototype) //true

Object.setPrototypeOf(target,{})  // 成功
Object.setPrototypeOf(proxy,{})  // 成功

/**
Reflect.getPrototypeOf() 方法在接收到的参数不是一个对象时会抛出错误
Object.getPrototypeOf() 方法，则会在操作之前，先将参数值转换为一个对象。
*/

/**
Object.getPrototypeOf（）与 Reflect.getPrototypeOf() 差异：
1. Object.getPrototypeOf（）方法能为数值 1 找到一个原型，首先会将数值 1 转换为一个Number对象，这样就可以使用Number 对象的原型；Reflect.getPrototypeOf() 不会转换参数
2. Reflect.getPrototypeOf() 方法返回一个Boolean表示操作是否成功：true：成功；false：失败；Objetc.getPrototypeOf（）操作失败时，会抛出错误
*/
let result1 = Object.getPrototypeOf(1)
console.log(result1 === number.prototype) // true

Reflect.getPrototypeOf(1) //抛出错误

// 对象可扩展性的陷阱函数
/**
ES5: Object.preventExtensions(),Object.isExtensible()为对象增加了可扩展性
ES6: 通过 preventExtensions 与 isExtensible 陷阱函数允许代理拦截对于底层对象的方法调用。

*/

let target = {}
let proxy = new Proxy(target, {
  isExtensible(trapTarget) {
    return Reflect.isExtensible(trapTarget)
  },
  preventExtensions(trapTarget){
    return Reflect.preventExtensions(trapTarget)
  }
})

console.log(Object.isExtensible(target))  //true
console.log(Object.isExtensible(proxy))  // true

Object.preventExtensions(proxy)

console.log(Object.isExtensible(target)) // false
console.log(Object.isExtensible(proxy))  // false


  












































