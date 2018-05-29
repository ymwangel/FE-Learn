// logic 

function isArray(a) {
  return Object.prototype.toString.call(a) === '[object Array]'
}
//判断obj是否是对象(包括对象、数组)
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
// 
function isPureObject(a) {
  return Object.prototype.toString.call(a) === '[object Object]'
}
// 合并参数、url
function paramConcatUrl(originurl,params){
  var urls = originurl.split('#')
  var url = urls[0]
  var equal = url.indexOf('=') == -1 ? true : false
  var index = url.indexOf('?') == -1 ? true : false
  url = (index ? url+'?' :
    equal ? url : url + '&')

  var pairs = []
  for(var key in params){
    if(params[key] != null){
      pairs.push(key+'='+encodeURIComponent(params[key]))
    }else{
      void null
    }
  }
  if(pairs.length == 0){
    return tourl(url)
  }else{
    // return tourl(url + rep + pairs.join('&'))
    return tourl(url + pairs.join('&'))
  }
  function tourl(url){
    if(urls.length>1){
      return url + '#' + urls.slice(1).join('#')
    }else{
      return url
    }
  }
}

// 1. 原生ajax实现
function toAjax(type,url,fnSuc, fnFail){
  var xhr = null
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest()
  }else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.open(type,url,ture)
  xhr.send()
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        fnSuc('success')
      }else{
        fnFail('fail')
      }
    }
  }
}
// 2. 使用Promise 的ajax
function getJSON(url, param){
  param = param || {}
  param._ = new Date - 0
  function createReq(){
    if(window.XMLHttpRequest()){
      return new XMLHttpRequest()
    }else {
      return new ActiveXObject('MSXML2.XMLHTTP')
    }
  }

  return new Promise(function(resolve, reject){
    var req = new createReq()
    req.open('GET',paramConcatUrl(url,param), true)
    req.onreadystatechange = function(){
      if(req.readystate == 200){
        resolve(JSON.parse(req.responseText))
      }else {
        reject(req)
      }
    }
    req.send(null)
  })
}

// 2. 前端处理跨域： jsonp 、 postMessage（iframe）

// 3.如何判断两个值是否相等
function looseEqual (a, b) {
  if( a === b ) { return true }
  var isObjectA = isObject(a)
  var isObjectB = isObject(b)  //isObject(obj)判断是否是对象类型（包括Array、{}）
  if(isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a)
      var isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB){
        var keysA = Object.keys(a)
        var keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual (a[key], b[key])
        })
      }else {
        return false
      }
    } catch (e) {
      return false
    }
  }else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

// 4.判断两个对象的值是否相等
function objectEqual(a,b){
  if(!isPureObject(a) || !isPureObject(b)){
    return false
  }else {
    try{
      var keysA = Object.keys(a)
      var keysB = object.keys(b)
      return keysA.length === keysB.length && keysA.every(function(key){
        return objectEqual(a[key],b[key])
      })  
    } catch(e){
      return false
    }
  }
}

// 5. 实现数组的深拷贝
function copyArray(arr){
  return arr.map( (item) => {
    if(typeof e === 'object'){
      return Object.assign({}, e)
    }else {
      return e
    }
  })
}

// 6.实现对象的深拷贝
function copyObject(target,obj){
  if(!isPureObject(obj)){
    return{}
  }else{
    return Object.assign(target,obj)
  }
}

// 7.从发送一个url地址到返回页面，中间发生了什么？

// 8.工作中性能优化的处理
// 节流
var last = 0
var throttle = function (fn,delay){   
    return function(){
      var curr = new Date() - 0
      if(curr-last > delay){
        fn.apply(this,arguments)
        last = curr
      }else{
        void null
      }
    }
  }
// 去抖
var debounce = function(idle, fn){
  var last
  return function(){
    var ctx =  this
    var args = arguments
    clearTimeout(last)
    last = setTimeout(function(){
      fn.apply(ctx,args)
    },idle)
  }
}

// 9. 原型、原型链、原型实现继承缺点，其他实现继承的方式
/**
1. 每个实例对象都有 __proto__ 属性，指向该实例等原型对象
2. 每个函数对象才会有prototype属性，指向函数对象的原型对象。
3. 原型链依赖于 __proto__ ，而不是prototype
4.原型继承
*/
// Student:仅仅是构造函数，并不是任何的原型，Student的原型是Student.prototype
function Student (props){
  this.name = props.name || 'Unnamed'
}

Student.prototype.hello = function() {
  alert(this.name)
}

// 基于Student扩展出PrimaryStudent ，可以先定义出PrimaryStudent
function PrimaryStudent(props) {
  Student.call(this, props)
  this.grade = props.grade || 1
}

// 但是，调用了Student构造函数但不等于继承了Student，PrimaryStudent创建的对象的原型是：
//  new PrimaryStudent() ---> PrimaryStudent.prototype --> Object.prototype ---> null
// 必须把原型链修改为：
// new PrimaryStudent() ---> PrimaryStudent.prototype ---> Student.prototype --> Object.prototype ---> null
// 这样，原型链就对了，继承关系也对了。新的基于PrimaryStudent创建的对象不但能调用PrimaryStudent定义的方法，也可以调用Student.prototype定义的方法
// 最简单粗暴的方法：
PrimaryStudent.prototype = Student.prototype
// 是不行的。这样的话，PrimaryStudent和Student共享一个原型对象，那还要定义PrimaryStudent干什么？

// 我们必须借助一个中间对象来实现正确的原型链，这个中间对象的原型要指向Student.prototype。中间对象可以用一个空函数F来实现
function PrimaryStudent(props){
  Student.call(this,props)
  this.grade = props.grade || 1
}
function F() {

}
// 把空函数的原型指向Student.prototype
F.prototype = Student.prototype
// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype
PrimaryStudent.prototype = new F()
// 把PrimaryStudent 原型的构造函数修复为PrimaryStudent
PrimaryStudent.prototype.constructor = PrimaryStudent
// 继续在PrimaryStudent原型（就是new F（）对象）上定义方法
PrimaryStudent.prototype.getGrade = function(){
  return this.grade
}

// 10.扩展对象
function extend (target, obj){
  for(var i in obj){
    if(obj.hasOwnProperty(i)){
      dst[i] = obj[i]
    }
  }
}

// 11. 同源策略：
/**
1.同源策略：同源策略限制一个加载的文档或脚本如何来与来自另一个源的资源进行交互，这是一个用于隔离潜在恶意文件的关键的安全机制。
2.Coookie、LocalStorage、IndexDB无法获取
3.DOM无法获取
4.AJAX无法发送
5.跨域通信方式： JSONP、postMessage、Hash、WebSocket CORS
*/









