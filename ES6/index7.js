// Set 与 Map
/**
Set: 是不包含重复值的列表。
Map：键值对的集合，常被用作缓存
*/

// ES5: 使用对象来模拟Set与Map，
let set = Object.create(null)
set.foo = true
// 检查属性的存在性
if(set.foo){

}
let map = Object.create(null)
map.foo = "bar"
// 提取一个值
let value = map.foo
console.log(value)

/**
创建Set并添加项目
Set 不会强制类型转换来判断值是否重复
用Object.is()来判断是否有重复的值
遍历set： forEach(),forEach(callback(a,b,c))
a: Set 中下个位置的值
b: 与第一个参数相同的值
3: 目标Set本身

Set:可以很好的追踪值，但是不能使用索引（index）直接访问某个值。
*/
let set = new Set()
set.add(5)
set.add("5")
console.log(set.size)   //2
console.log(set.has(5)) // true
console.log(set.has(6)) //false
set.delete(5)
set.clear()   //清空set集合

let set = new Set()
let key1 = {}
let key2 = {}
set.add(key1)
set.add(key2)
console.log(set.size)   //2

let set = new Set([8,5,6,4,5,5,5,5])
console.log(set.size)   //5
set.forEach(function (value, key, ownerSet) {
  // key与value总是相同的
  console.log(key + " " + value)
  console.log(ownerSet === set)
})

// 与数组相同，this,在回调函数中使用this，可以给forEach()中传入一个this 值，作为第二个参数
let set = new Set([8,5,6,4,5,5,5,5])
let processor = {
  output(value) {
    console.log(value)
  },
  process(dataSet) {
    dataSet.forEach(function (value) {
      this.output(value)
    }, this)
  }
}
processor.process(set)
// 更简便的方法：使用箭头函数。箭头函数没有this，所以箭头函数中的this仍然是箭头函数所在作用域的this
let set = new Set([8,5,6,4,5,5,5,5])
let processor = {
  output(value) {
    console.log(value)
  },
  process(dataSet) {
    dataSet.forEach((value) => this.output(value))
  }
}
processor.process(set)

// 将Set转换为数组
/**
set转换为数组，使用 扩展运算符（第三章）：
因为：扩展运算符（...），能将数组中的项分割开并作为函数的分离参数
同样，扩展运算符，可以应用于Set，将Set中的项分割开并作为函数的分离参数
*/
let set = new Set([8,5,6,4,5,5,5,5])    //将数组转换为Set
let array = [...set]                    //将set转换为数组
console.log(array)

// 例如：对已存在的数组去重
function eliminateDuplicates(items) {
  return [...new Set(items)]    // 将set序列转换为数组
}
let numbers = [8,5,6,4,5,5,5,5]
let noDuplicates = eliminateDuplicates(numbers)
console.log(noDuplicates)

/**
Strong Set:
1.由于Set类型存储对象引用的方式，--可以被称为Strong Set.
2.对象存储在Set的一个实例中时，实际上相当于把对象存储到变量中
3.只要对于Set实例的引用仍然存在，所存储的对象就无法被垃圾回收机制回收，从而无法释放内存，有可能造成内存泄漏
*/
// 例如：
let set = new Set()
let key = {}
set.add(key)
console.log(set.size)
// 取消原始引用
key = null
console.log(set.size)
console.log([...set])
// 重新获得原始引用
key = [...set][0]

/**
Weak Set:为解决上述 问题：
例如：JS在网页中运行，同时想保持与DOM元素的联系，在该元素可能被其他脚本移除的情况下，代码不应该保留对该DOM元素的最后一个引用（如果保留，就是：内存泄露）
Weak Set: 该类型只允许存储对象弱引用，而不能存储基本类型的值。
对象的弱引用，在它自己成为该对象的唯一引用时，不会阻止垃圾回收
*/

// 
// 1.创建Weak Set， Weak Set 包含 add() has() delete()
// 2.WeakSet 构造器，不接受基本类型的值
// 例如：
let set = new WeakSet()
let key = {}
set.add(key)

set.delete(key)
console.log(set.has(key))   //false
// 也可给Weak Set传入一个可迭代对象来初始化
let key1 = {}
let key2= {}
let key3 = 5
let set = new WeakSet([key1,key2]) 
console.log(set.size)  //2
console.log(set.has(key1)) //true
console.log(set.has(key2)) //true
let set1 = new WeakSet([key1,key2,key3])  //报错，

/**
Weak Set 与Set 差异：
1.对于WeakSet的实例，若调用add()方法时传入了非对象的参数，就会抛出错误。
2.WeakSet实例，调用has()、 delete()则会在传入了非对象的参数时返回false
3.WeakSet不可迭代，因此不能被用在for-of循环中
4.Weak Set无法暴露出任何迭代器（例如：keys()与values()方法。），因此没有任何编程手段可用于判读WeakSet的内容
5.WeakSet没有forEach（）方法
6.WeakSet没有size属性
*/

let set = new WeakSet()
let key = {}
set.add(key)
console.log(set.has(key))
key = null
// 代码执行后，JS引擎已经正确地将引用移除了。但是对Weak Set的引用特征无法进行测试

/**
Map: Set处理值列表，但是不能给值添加额外信息，使用Map
1.Map的键值对可是任意类型。
2.Map
*/
let map = new Map()
let key1 = {}
let key2 = {}
map.set("title",'Understanding ES6')
map.set('year',2016)
map.set(key1,5)
map.set(key2,42)
console.log(map.get("title"))   // Understanding ES6
console.log(map.get('year'))   // 2016
console.log(map.get('name')) //undefined
console.log(map.get(key1)) //5
console.log(map.get(key2)) //42

/**
Map与Set共享的方法：
1.has(key) :判断指定的键是否存在于Map中
2.delete(key):移除Map中的键以及对应的值
3.clear():移除Map中的所有的键与值
*/

// Map:初始化
// 1.可接受数组参数
let map = new Map([["name","Nicholas"],["age",25]])
console.log(map.has("name"))
map.forEach(function (value, key, ownerMap) {
  console.log(key + " " + value)  
  console.log(ownerMap === map)   //true
})

/**
Weak Map 与Map
与Weak Set 对Set一样。Weak版本都是存储对象弱引用的方式。
在Weak Map中，所有的键都必须是对象，而且这些对象都是弱引用，不会干扰垃圾回收
Weak Map的键才是弱引用，而值不是，在Weak Map的值中存储对象会阻止垃圾回收，即使该对象的其他引用已全部都被移除。
*/

let map = new WeakMap()
let element = document.querySelector(".element")
map.set(element,"Original")
let value = map.get(element)
console.log(value)   // Original

// 移除元素
element.parentNode.removeChild(element)
element = null

// 该 Weak Map 在此处为空
// 1.类似于Weak Set，没有任何方法确认Weak Map 是否为空，因为 Weak Map没有size属性。
// 2.在其他引用被移除后，由于对键的引用不再有残留，也就无法调用get（）方法来提取对应的值
// 3.Weak Map已经切断了对于该值的访问，其所占的内存在垃圾回收器运行时便会被释放。

let key1 = {}
let key2 ={}
let key3 = 'name'
let map = new WeakMap([[key1,"hello"],[key2,42]])
console.log(map.has(key1))
console.log(map.get(key1))
console.log(map.has(key2))
console.log(map.get(key2))

let map = new WeakMap([[key1,"hello"],[key2,42],[key3,'lisi']])  //报错，因为，WeakMap的键必须都是对象

/**
Weak Map的方法：
has()
delete()
注意：没有clear（）
*/
let map = new WeakMap()
let element = document.querySelector(".element")
map.set(element,"Original")
console.log(map.has(element)) // true
console.log(map.get(element)) // Original
map.delete('element')
console.log(map.has(element)) //false
console.log(map.get(element)) //undefined

/**
对象的私有数据
*/
// ES5实现：
var Person = (function() {
  var priviteData = {}
  var priviteId = 0
  function Person(name) {
    Object.defineProperty(this, "_id", {value: priviteId++})
    priviteData[this._id] = {
      name: name
    }
  }
  Person.prototype.getName = function() {
    return priviteData[this._id].name
  }
  return Person
}())
var person = new Person("lisi")
console.log(person.getName())

// ES6 -- WeakMap 
let Person = (function () {
  let priviteData = new WeakMap()
  let priviteId = 0
  function Person(name) {
     priviteData.set(this,{name: name}) 
  }
  Person.prototype.getName = function(){
    return priviteData.get(this).name
  }  
  return Person
}())

let person = new Person("wangcai")
console.log(person.getName())
/**
使用WeakMap而不是对象来保存数据，
1.由于Person对象的实例本身能被作为键来使用，于是也就无须再记录单独的ID。
2.当Person构造器被调用时，将this作为键在Weak Map上建立了一个入口，而包含私有信息的对象成为了对应的值，其中只存放了name属性
3.通过将this传递给privateData.get（），以获取值对象并访问其name属性，getName（）函数便能提取私有信息
4.这种技术让私有信息能够保持私有状态，并且与之相关的对象实例被销毁时，私有信息也会被同时销毁
*/




