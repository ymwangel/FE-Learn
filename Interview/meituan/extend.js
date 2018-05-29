// javascript 实现继承 ： ES5
/**
一：构造函数实现继承
*/

/** 
更改了prototype对象，就要为新的prototype对象加上constructor属性，并将这个属性指回原来的构造函数

o.prototype = {}
o.prototype.constructor = o

*/

function Animal() {
  this.species = '动物'
}

var ani = new Animal()

// 1.构造函数绑定

function Cat(name, color){
  Animal.apply(this, arguments)
  this.name = name
  this.color = color
}
var cat1 = new Cat('大毛', 'blue')
console.log(cat1.species)
console.log(cat1.__proto__)
console.log(Cat.prototype)
console.log(cat1.__proto__ === Cat.prototype)  //true

// 2.prototype模式
function Cat(name, color){
  this.name = name
  this.color = color
}

Cat.prototype = new Animal()  
// 这样，Animal原型上有的方法和属性，Cat.prototype上也都会有，
// 此时，Cat.prototype.constructor 指向 Animal（）
console.log(Cat.prototype)
console.log(ani)
console.log(Cat.prototype == ani ) //false ,因为，比较的是对象的指针地址
// Cat.prototype.constructor 指向 Cat（）
console.log(Cat.prototype.constructor == Animal) //true
Cat.prototype.constructor = Cat     
var cat2 = new Cat('lisa', 'blue')
console.log(cat2.species)

/**
（1）Cat.prototype = new Animal()  
// 将Cat的prototype对象指向一个Animal的实例
//它相当于完全删除了prototype对象原先的值，然后赋予一个新值。

（2）Cat.prototype.constructor = Cat
//任何一个prototype对象都有一个constructor属性，指向它的构造函数
如果没有 （1） 这一行代码，Cat.prototype.constructor 是指向Cat的，
但是执行 完 （2） 这一行代码，Cat.prototype.constructor 指向 Animal 了

 // 每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性
 console.log(cat2.constructor == Cat.prototype.constructor)  //true

所以，在运行 （1） 这一行代码后，显然会导致继承链的紊乱，所以，需要手动更正，也就是 （2） 这一行代码，必须遵循这一点

*/

// 3. 直接继承 prototype，是第二种方法的改进
/**
由于 Animal 对象中，不变的属性都可以直接写入 Animal.prototype。所以，我们也可以让Cat（）跳过Animal（），直接继承Animal.prototype
// 然后将Cat.prototype，指向Animal.prototype，就完成了继承
与第二种方法比较：
优点：效率高（不用执行和建立Animal的实例了），比较省内存
缺点：Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何Cat.prototype的修改，都会反映到Animal.prototype

所以，Cat.prototype.constructor = Cat, 是有问题的，
这样，Animal.prototype.constructor 也指向了Cat。
*/

function Animal (){}
Animal.prototype.species = '动物'
// 然后将Cat.prototype，指向Animal.prototype
Cat.prototype = Animal.prototype
Cat.prototype.constructor = Cat
var cat3 = new Cat('lis','green')
console.log(cat1.species)


// 4.利用空对象作为中介
/**
由于“直接继承prototype”存在上述的缺点，所以，就有第四种发放，利用过一个空对象作为中介：
*/

var F = function(){}
F.prototype = Animal.prototype
Cat.prototype = new F()
Cat.prototype.constructor = Cat
// F是空对象，所以几乎不占内存。这是，修改Cat的prototype 对象，就不会影响到Animal 的 prototype对象
console.log(Animal.prototype.constructor)   //Animal

// 将上面的方法封装为一个函数
function extend (Child, Parent){
  var F = function () {}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
  // 为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。
  Child.uber = Parent.prototype
}

// 5. 拷贝继承（浅拷贝）
/**
拷贝继承：纯粹采用“拷贝”方法实现继承，
简单说：如果把父对象的所有属性和方法，拷贝进子对象，也能够实现继承
*/

// 首先，把Animal所有不变的属性，都放到它的prototype对象上。
function Animal(){}
Animal.prototype.species = 'animal'

// 编写函数，实现属性拷贝目的（浅拷贝）
function extend2(Child, Parent) {
  var p = Parent.prototype
  var c = Child.prototype
  for(var i in p){
    c[i] = p[i]
  }
  c.uber = p;
}

/**
二：非构造函数 实现继承
*/

var Chinese = {
  nation: '中国'
}

// 深拷贝: 子对象的变更，不会影响到父对象
function deepCopy(p, c){
  var c = c || {}
  for(var i in p){
    if(typeof p[i] === 'object'){
      c[i] = (p[i].constructor === Array) ? [] : {}
      deepCopy(p[i],c[i])
    }else {
      c[i] = p[i]
    }
  }
  return c
}

var Doctor = deepCopy(Chinese)
Chinese.birthPlace = ['北京','上海','香港']
Doctor.birthPlace.push('厦门')


// 三：用Object.create()实现继承

function Shape(){
  this.x = 0
  this.y = 0
}

Shape.prototype.move = function(x,y){
  this.x += x;
  this.y += y
}

function Rectangle(){
  Shape.call(this)
}

Rectangle.prototype = object.create(Shape.prototype)
Rectangle.prototype.constructor = Rectangle

// 综上，封装extend

var extend = function (Base) {
  var Class = function () {
      Base.apply(this, arguments);
  }, F;
  if (Object.create) {
      Class.prototype = Object.create(Base.prototype);
  } else {
      F = function () {};
      F.prototype = Base.prototype;
      Class.prototype = new F();
  }
  Class.prototype.constructor = Class;
  return Class;
};

// 四： ES6 实现继承

class Rectangle {
  constructor(length, width){
    this.length = length
    this.width = width
  }
  getArea (){
    return this.length * this.width
  }
}

class Square extends Rectangle {
  constructor(length){
    super(length,length)
  }
}
var square = new Square(3)
console.log(square.getArea())

// 五： new关键字：

/**
页面中的js程序的运行情况：
1. window对象，全局的
2. 栈，函数调用时使用
3. 堆：使用new 关键字申请

总结：new 关键字，用来申请内存
    如果不使用new ，就是函数调用，本质上就是执行内存中 window对象的代码
    函数定义 这个操作，本身就是给 window这个JSON对象添加成员


new 关键字：创建一个新对象，也就是一个Object的实例，一个JSON实例

ECMAScript 对JSON 对象有几个特别的规定：ECMAScript-Object
1. prototype属性
2. constructor属性
3. hasOwnProperty(property)方法
4. propertylsEnumerable(property)方法

使用new ，做了四件事情
1. 创建一个新的对象，这个对象的类型时object
2. 设置这个新的对象的内部、可访问性 和 [[prototype]] 属性为构造函数（指prototype.constructor所指向的构造函数）中设置的
3. 执行构造函数，当this关键字 被提及的时候，使用新创建的对象的属性，返回新创建的对象
4. 在创建新对象成功后，如果调用一个新对象没有的属性的时候，js会沿 原型链 向上 逐层查找的
*/













