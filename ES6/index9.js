/**
JS中的类：
1. 类声明不会被提升，与函数定义不同。
2. 类声明的行为与let相似，因此在程序的执行到达声明处之前，类会存在于暂时性死区内
3. 类声明中的所有代码会自动运行在严格模式下，并且也无法退出严格模式
4. 类的所有方法都是不可枚举的，这是对于自定义类型的显著变化。而自定义类型 必须用Object.defineProperty() 才能将方法改变为不可枚举
5. 调用类构造器时不使用new ，会抛出错误。但是自定义类型，调用时可以不使用new，不会报错，但是如果不使用new，就不是构造一个实例。
6. 试图在类的方法内部重写类名，会抛出错误
7. 可以为类创建访问器属性
*/

// ES5中自定义类型
function PersonType(name){
  this.name = name
}
PersonType.prototype.sayName = function () {
  console.log(this.name)
}
let person = new PersonType("Nicholas")
person.sayName() //"Nicholas"
console.log(person instanceof PersonType)  //true
console.log(person instanceof Object) //true

// ES6
/**
PersonClass声明实际上创建了一个拥有constructor 方法及其行为的函数，
所以，typeof PersonClass === "function" // true
*/
class PersonClass {
  // 等价于PersonType构造器
  constructor(name) {
    this.name = name
  }
  // 等价于PersonType.prototype.sayName
  sayName() {
    console.log(this.name)
  }
}
console.log(typeof PersonClass) //function
let person = new PersonClass("lisi")
person.sayName() // lisi
console.log(person instanceof PersonClass)   // true
console.log(person instanceof Object)  // true

// PersonClass声明实际上就直接等价于以下未使用类语法的代码
/**
1.有两个PersonType2声明：一个在外部作用域的let声明，一个在IIFE内部的const声明
2.这就是为何类的方法 不能对类名进行重写、而类外部的代码则被允许
*/
let PersonType2 = (function () {
  "use strict"
  const PersonType2 = function (name) {
    // 确认函数被调用时使用了new
    if(typeof new.target === "undefined"){
      throw new Error("constructor must be called with new.")
    }
    this.name = name
  }

  // sayName 方法定义为不可枚举，并且检查了new.target
  Object.defineProperty(PersonType2.prototype, "sayName", {
    value: function () {
      // 确认函数被调用时没有使用new
      if(typeof new.target !== "undefined"){
        throw new Error('Method cannot be called with new ')
      }
      console.log(this.name)
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
  // 将构造器函数返回出去
  return PersonType2
}()) 

/**
不变的类名：
1.只有在类的内部，类名才被视为是使用const声明的。这就意味着你可以在外部重写类名，但不能载类的方法内部重写类名
例如：
2.在Foo类代码中，类构造器内部的Foo与类外部的Foo是不同的绑定，内部的Foo就像是用const定义的，不能被重写，当构造器尝试使用任何值重写Foo时，都会抛出错误
3.但由于外部的Foo就像是用let声明的，你可以随时重写类名
*/
class Foo {
  constructor(name) {
    Foo = "bar" //执行时抛出错误
    this.name = name
  }
}
// 但在类声明之后没问题
Foo = "bar"

/**
类表达式；与function函数表达式类似，等价于类声明
例如：PersonClass的表达式形式：
*/
// 匿名类表达式
let PersonClass = class {
  constructor(name){
    this.name = name
  }
  sayName(){
    console.log(this.name)
  }
}
let person = new PersonClass('lisi')
person.sayName()
console.log(person instanceof PersonClass) //true
console.log(person instanceof Object)  //true
console.log(typeof PersonClass) // "function"
console.log(typeof PersonClass.prototype.sayName) //"function"

// 具名类表达式
/**
此例中类表达式被命名为PersonClass2
PersonClass2标识符只在类定义内部存在，因此，只能在类方法内部（例如本例的sayName（）内）。
在类的外部，typeof PersonClass2 结果为 undefined, 这是因为外部不存在PersonClass2 绑定。
*/
let PersonClass = class PersonClass2 {
  constructor(name){
    this.name = name
  }
  sayName(){
    console.log(this.name)
  }
}
console.log(typeof PersonClass) // "function"
console.log(typeof PersonClass2) //"undefined"

// 具名类表达式：相当于以下代码
let PersonClass = (function () {
  "use strict"
  const PersonClass2 = function (name) {
    if(new.target === "undefined"){
      throw new Error("Constructor must be called with new")
    }
    this.name = name
  }
  Object.defineProperty(PersonClass2.prototype, "sayName", {
    value: function () {
      if(typeof new.target !== "undefined"){
        throw new Error("Method cannot be called with new")
      }
      console.log(this.name)
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
  return PersonClass2
}())

/**
1. 类、函数，JS的一级公民。
2. 类表达式的另一个用途：立即调用构造器，以创建单例（Singleton），但是，必须使用new 来配合类表达式，并在表达式后面添加括号。
*/

// 1.
function createObject(classDef){
  return new classDef()
}
let obj = createObject(class{
  sayHi(){
    console.log('Hi')
  }
})
obj.sayHi() // "Hi"

// 2.立即调用构造器
/**
此处，创建了一个匿名类表达式，并立即执行了它
类表达式后面的圆括号表示要调用前面的函数，并且还允许传入参数
*/
let person = new class {
  constructor(name) {
    this.name = name
  }
  sayName() {
    console.log(this.name)
  }
}('lisi')
person.sayName() //"lisi"
// 为类创建访问器属性

class CustomHTMLElement {
  constructor(element){
    this.element = element
  }
  get html(){
    // html 为访问器属性
    return this.element.innerHTML
  }
  set html(value) {
    this.element.innerHTML = value
  }
}
var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype,"html")
console.log("get in descriptor") //true
console.log("set in descriptor") //true
console.log(descriptor.enumerable) //false
// 非类的等价表示如下：
let CustomHTMLElement = (function () {
  "use strict"
  const CustomHTMLElement = function (element) {
    if(typeof new.target === 'undefined'){
      throw new Error('Constructor must be called with new')
    }
    this.element = element
  }
  Object.defineProperty(CustomHTMLElement.prototype, "html", {
    enumerable: false,
    configurable: true,
    get: function () {
      return this.element.innerHTML
    },
    set:function (value) {
      this.element.innerHTML = value
    }
  })
  return CustomHTMLElement
}())
// 需计算的成员名
let methodName = "sayName"
class PersonClass {
  constructor(name) {
    this.name = name
  }
  [methodName](){
    console.log(this.name)
  }
}
let me = new PersonClass("lisi")
me.sayName() //"lisi"
// 访问器属性性能以相同方式使用需计算的名称
let propertyName = "html"
class PersonClass {
  constructor(element) {
    this.element = element
  }
  get [propertyName](){
    return this.element.innerHTML
  }
  set [propertyName](value) {
    this.element.innerHTML = value
  }
}

/**
生成器方法
例如：
*/
class MyClass {
  *createIterator() {
    yield 1;
    yield 2;
    yield 3;
  }
}
let instance = new MyClass()
let iterator = instance.createIterator()
iterator.next()  // {value: 1, done: false}
iterator.next()  // {value: 2, done: false}
iterator.next()  // {value: 3, done: false}
iterator.next()  // {value: undefined, done: true}

// 在表示集合的自定义类中定义一个默认生成器
class Collection {
  constructor() {
    this.items = []
  }
  *[Symbol.iterator]() {
    // for(let item of this.items){
    //   yield item
    // }
    // 或者
    yield *this.items
    // 或者
    yield *this.items.values()   // Chrome会报错
      /**
      内置的迭代器
      ES6具有三种集合对象类型：数组、Map、Set，三种类型都有如下迭代器
      1.entries()：返回一个包含键值对的迭代器
      2.values（）：返回一个包含集合中的值的迭代器
      3.keys（）：返回一个包含集合中的键的迭代器
      以上三个迭代器，对于数组，entries()、keys(),Chrome支持，但是values（),Chrome不支持
      */
  }
}
var collection = new Collection()
collection.items.push(1)
collection.items.push(2)
collection.items.push(3)
for(let x of collection) {
  console.log(x)
}

// 若想让 方法与访问器属性只存在于类自身，需要使用静态成员
/**
静态成员：
直接在构造器上添加额外方法来模拟静态成员
例如：
1.其他编程语言中，工厂方法 PersonType.create()会被认为一个静态方法，它的数据不依赖PersonType的任何实例，
2. ES6简化了静态成员的创建，只要在方法与访问器属性的名称前添加正式的 static 标注。,但是不能用于constructor方法的定义
3. 静态成员不能用实例来访问，始终需要直接用类自身来访问静态成员
*/
// ES5
function PersonType(name) {
  this.name = name
}
// 静态方法
PersonType.create = function (name) {
  return new PersonType(name)
}
// 实例方法
PersonType.prototype.sayName = function () {
  console.log(this.name)
}
var person = PersonType.create("lisi")
// ES6
class PersonType {
  constructor(name) {
    this.name = name
  }
  sayName() {
    console.log(this.name)
  }
  static create(name) {
    return new PersonType(name)
  }
}
let person = PersonType.create("lisi")

/**
使用派生类进行继承
派生类：继承了其他类的类被称为派生类（derived classes）
1.如果派生类指定了构造器，就要使用super（），否则会造成错误
2.如果选择不使用构造器，super（）方法会被自动调用，并会使用创建新实例时提供的所有参数，
3.派生类中的方法总是会屏蔽基类的同名方法。所以，可以使用super.getAear()这样来访问基类中的方法
*/
// ES5
function Rectangle(length, width) {
  this.length = length
  this.width = width
}
Rectangle.prototype.getArea = function () {
  return this.length * this.width
}
function Square(length) {
  Rectangle.call(this,length,length)
}
Square.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    value: Square,
    enumerable: true,
    writable: true,
    configurable: true
  }
})
var square = new Square(3)
console.log(square.getArea()) //9
console.log(square instanceof Square) // true
console.log(square instanceof Rectangle)  //true

// ES6
/**
1.extends :表明继承关系
2. super()： 访问基类的构造器，此处，访问Rectangle的构造器
*/
/**
使用super（）
1. 只能派生类中使用super（），若尝试在非派生的类中（）即：没有使用extends关键字的类）或函数中使用它，会抛出错误
2. 在构造器中，必须在访问this之前调用super（）。由于super（）负责初始化this。因此，试图先访问this，自然就会造成错误错误
3. 唯一能避免使用super（）的办法，是从构造器中返回一个对象
*/
class Rectangle {
  constructor(length, width) {
    this.length = length
    this.width = width
  }
  getArea() {
    return this.length * this.width
  }
}

class Square extends Rectangle {
  constructor(length) {
    super(length,length)
  }
}
var square = new Square(3)
console.log(square.getArea())  // 9
console.log(square instanceof Square)     // true
console.log(square instanceof Rectangle)  // true

// 继承静态成员
class Rectangle{
  constructor(length,width) {
    this.length=length
    this.width = width
  }
  getArea(){
    return this.length * this.width
  }
  static create(length, width) {
    return new Rectangle(length,width)
  }
}
class Square extends Rectangle {
  constructor(length) {
    super(length,length)
  }
}

var rect = Square.create(3,4)
console.log(rect instanceof Rectangle) // true
console.log(rect.getArea())
console.log(rect instanceof Square)

// 从表达式中派生类
function Rectangle(length, length) {
  this.length = length
  this.width = width
}
Rectangle.prototype.getArea = function () {
  return this.length * this.length
}
function getBase() {
  return Rectangle
}
class Square extends getBase() {
  constructor(length) {
    super(length,length)
  }
}

var x = new Square(3)
console.log(x.getArea()) //9
console.log(x instanceof Rectangle) //true


// ES6类：允许从内置对象上进行继承。


// 在构造器中使用new.target 
// new.target 的值不总是相同
/**
super使得Square调用了Rectangle构造器，因此当Rectangle构造器被调用时，new.target等于Square。
1. 因为构造器能根据如何被调用而有不同行为，并且这给了更改这种行为的能力
例如：可以使用new.target来创建一个抽象基类（一种不能被实例化的类）
*/
class Rectangle {
  constructor (length, width) {
    console.log(new.target === Rectangle) 
    this.length = length
    this.width = width
  }
}

var obj = new Rectangle(3,4) //true  new.target = Rectangle

class Square extends Rectangle {
  constructor(length) {
    super(length,length)
  }
}
var objS = new Square(3)   // new.target = Square

// 使用new.target创建抽象基类
class Shape {
  constructor() {
    if(new.target === Shape) 
      throw new Error("This class cannot be instantiated directly")
  }
}
class Rectangle extends Shape {
  constructor(length,width) {
    super()
    console.log(this) // 指向Rectangle
    this.length = length
    this.width = width
  }
}  
var x = new Shape()  // 抛出错误
var y = new Rectangle(3,4)  // 没有错误
console.log(y instanceof Shape) // true












