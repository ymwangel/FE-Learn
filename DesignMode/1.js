/**
1. 单例模式：
应用场景：一个单一对象，比如：弹窗，无论点击多少次，弹窗只应该被创建一次
*/

class CreateUser {
  constructor(name) {
    this.name = name
    this.getName()
  }
  getName(){
    return this.name
  }
}
// 代理实现单例模式
var ProxyMode = (function() {
  var instance  = null
  return function (name) {
    if(!instance){
      instance = new CreateUser(name)
    }
    return instance
  }
})()

// 测试单例模式的实例：
var a = new ProxyMode('aaa')
var b = new ProxyMode('bbb')
// 因为单例模式只实例话一次，所以下面的实例是相等的
console.log(a === b)
console.log(a.getName())
console.log(b.getName())
console.log(b)

/**
2.策略模式：
定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换
目的：将算法的使用、算法的实现分离开来
由两部分组成：
（1）.策略类：（可变），策略类封装了具体的算法，并负责具体的计算过程。
（2）. 环境类Context（不变）：Context接受客户的请求，随后将请求委托给某一个策略类。所以，Context中要维持对某个策略对象的引用
*/

// 策略类
var levelOBJ = {
  "A": function(money) {
    return money * 4
  },
  "B": function(money) {
    return money * 3
  },
  "C": function(money) {
    return money * 2
  }
}

// 环境类
var calculateBouns = function(level, money){
  return levelOBJ[levelOBJ](money)
}
console.log(calculateBouns('A'),10000)

/**
3.代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问
常用的虚拟代理模式：某一个花销很大的操作，可以通过虚拟代理的方式延迟到这种需要它的时候才去创建（例如：使用虚拟代理实现图片懒加载）
图片懒加载到方式：先通过一张loading图占位，然后通过异步的方式加载图片，等图片加载好了再把完成的图片加载到img标签里面
使用代理模式实现图片懒加载优点：符合单一职责原则，减少一个类或方法的粒度合耦合度
*/

var imgFunc = (function() {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function (src) {
      imgNode.src = src
    }
  }
})()

var proxyImage = (function () {
  var img = new Image()
  img.onload = function () {
    imgFunc.setSrc(this.src)
  }
  return {
    setSrc: function(src) {
      imgFunc.setSrc('./loading.gif')
      img.src = src
    }
  }
})()

proxyImage.setSrc('./pic.png')

/**
4.中介者模式：通过一个中介者对象，其他所有的相关对象都通过中介者对象来通信，而不是相互引用，
当其中一个对象发生改变时，只需要通知中介者对象即可。
通过中介者模式可以解除对象与对象之间的紧耦合

适用场景：例如购物车需求，存在商品选择表单、颜色选择表单、购买数量表单等。都会出发change事件，
则可以通过 中介者 来 转发处理这些事件，实现各个事件的解耦，仅仅维护中介者对象即可
*/  

var goods = { //手机库存
  'red|32G': 3,
  'red|64G':1,
  'blue|32G': 7,
  'blue|64G': 6,
}
// 中介者
var mediator = (function(){
  var colorSelect = document.getElementById('colorSelect')
  var memorySelect = document.getElementById('memorySelect')
  var numSelect = document.getElementById('numSelect')
  return {
    changed: function (obj) {
      switch(obj) {
        case colorSelect: 
          // TODO
          break;
        case memorySelect: 
          // TODO
          break;
        case numSelect: 
          // TODO
          break;
      }
    }
  }
})()

colorSelect.onchange = function () {
  mediator.changed(this)
}
memorySelect.onchange = function () {
  mediator.changed(this)
}
numSelect.onchange = function () {
  mediator.changed(this)
}

/**
5.装饰着模式： 在不改变对象自身的基础上，在程序运行期间给对象动态添加方法
适用场景：
1.原有方法维持不变，在原有方法上再挂在挂载其他方法来满足现有需求；
2.函数的解耦，将函数拆分成多个可复用的函数，再将拆分出来的函数挂载到某个函数上，实现相同的效果，但增强了复用性
*/
// 用AOP装饰函数实现装饰着模式
Function.prototype.before = function(beforefn){
  var self = this //保存原函数引用
  return function () {      //返回包含了原函数和新函数的 ’代理函数‘
    beforefn.apply(this,arguments)    //执行新函数，修正this
    return self.apply(this, arguments)   //执行原函数
  }
}

Function.prototype.after = function(afterfn){
  var self = this
  return function(){
    var ret = self.apply(this,arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}

var func = function() {
  console.log('2')
}
// func1和func3为挂载函数
var func1 = function(){
  console.log('1')
}

var func3 = function(){
  console.log('3')
}

func = func.before(func1).after(func3)
func()


























