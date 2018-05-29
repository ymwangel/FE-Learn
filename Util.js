/*eslint-diable */
/*
 通用函数集锦：保持浏览器原生支持的语法
*/

function isFunction(a) {
  return typeof a === 'function'
}
function isArray(a) {
  return Object.prototype.toString.call(a) === '[object Array]'
}
function isObject(a) {
  return Object.prototype.toString.call(a) === '[object Object]'
}
function isString(a) {
  return Object.prototype.toString.call(a) === '[object String]'
}
function isNumber(a) {
  return Object.prototype.toString.call(a) === '[object Number]'
}
function isBoolean(a) {
  return Object.prototype.toString.cal(a) === '[object Boolean]'
}

function toArray(a) {
  return [].slice.call(a)
}

//判断obj是否是对象(包括对象、数组)
function isObjectNoPure (obj) {
  return obj !== null && typeof obj === 'object'
}

//判断参数a，和b是否严格相等
function looseEqual (a, b) {
  if( a === b ) { return true }
  var isObjectA = isObjectNoPure(a)
  var isObjectB = isObjectNoPure(b)  //isObjectNoPure(obj)判断是否是对象类型（包括Array、{}）
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

function once (fn) {
  var called = false
  return function () {
    if(!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

function parserUrl(url) {
  var r = {}
  var preqs = url.split('#')[0]
  var qs = preqs.split('?').slice(1).join('?')
  qs = qs.indexOf("&") == 0 ? qs.slice(1) : qs
  if(qs == ''){
    void null
  }else{
    var pairs = qs.split('&')
    for(var i=0;i<pairs.length;i++){
      var keyValue = pairs[i].split('=')
      var key = keyValue[0]
      r[key] = keyValue.slice(1).join('=')
    }
  }
  return r
}

function paramConcatUrl(originurl,params){
  var urls = originurl.split('#')
  var url = urls[0]
  // var rep = url.indexOf('?') == -1 ? '?' : '&'
  var equal = url.indexOf('=') == -1 ? true : false
  var index = url.indexOf('?') == -1 ? true : false
//     if(index == -1) {
//       url = url+'?'
//     }else {
//       if(equal){
//         void null
//       }else {
//         url = url + '&'
//       }
//     }
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

window.STATE_CALLBACK = {
  uid: new Date - 0
}

// jsonp原理：通过script无跨域实现
//   1.创建script元素
//   2.定义callbackName以及callbackName的值
//   3.赋值script的async、src属性
//   4.将script插入body中
//   5.定义回调函数，回调函数的名字，就是callbackName的值
//   6.在回调函数中删除script元素，并处理返回值

function jsonp(url,param,callbackName) {
  return new Promise(function (resolve,reject) {
    callbackName = callbackName || 'jsonpCallback'
    var name = ['ymwangel',STATE_CALLBACK.uid++].join('')
    param[callbackName] = ['STATE_CALLBACK.',name].join('')
    var script = document.createElement('script')
    script.setAttribute('async','async')
    script.src = paramConcatUrl(url,param)
    script.onerror = function (e) {
      reject(e)
    }
    document.body.appendChild(script)
    // 回调函数
    STATE_CALLBACK[name] =  function (data) {
      delete STATE_CALLBACK[name]
      document.body.removeChild(script)
      resolve(data)
    }
  })
}

function getJSON(url,param) {
  param = param || {}
  param._ = new Date - 0
  function creatReq() {
    if(window.XMLHttpRequest()){
      return new XMLHttpRequest()
    }else{
      return new ActiveXObject('MSXML2.XMLHTTP')
    }
  }
  return new Promise(function (resolve,reject) {
    var req = creatReq()
    req.open("GET",paramConcatUrl(url,param),ture) //true : async的值
    req.onreadystatechange = function () {
      if(req.readystate == 4){
        if(req.status == 200){
          resolve(JSON.parse(req.responseText))
        }else{
          reject(req)
        }
      }
    }
    req.send(null)
  })
}

function postJSONToJSON(url,param) {
  function  creatReq() {
    if(window.XMLHttpRequest){
      return new XMLHttpRequest()
    }else{
      return new ActiveXObject('MSXML2.XMLHTTP')
    }
  }
  return new Promise(function (resolve,reject) {
    var req = creatReq()
    req.open("POST",url,true)
    req.setRequestHeader('Content-Type','application/json; charset=utf-8')
    req.onreadystatechange = function () {
      if(req.readystate == 4){
        if(req.status == 200){
          resolve(JSON.parse(req.responseText))
        }else{
          reject(req)
        }
      }
    }
    req.send(JSON.stringify(param))
  })
}

function putData(key,value) {
  try{
    localStorage.setItem(key,JSON.stringify(value))
  }catch(a){
    window.console&&window.console.log(a)
  }
}

function getData(key) {
  try{
    return JSON.parse(localStorage.getItem(key) || 'null')
  }catch(a){
    window.console&&window.console.log(a)
  }
}

function head(xs) {
  return xs[0]
}

function tail(xs) {
  return xs.slice(1)
}

function each(fn,xs) {
  for(var i=0;i<xs.length;i++){
    fn(xs[i])
  }
}

function map(fn,xs) {
  var r = []
  for(var i=0;i<xs.length;i++){
    r.push(fn(xs[i]))
  }
  return r
}

function mapIndex(fn,xs) {
  var r = []
  for(var i=0;i<xs.length;i++){
    r.push(fn(xs[i],i))
  }
  return r 
}

function find(fn,xs) {
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i])){
      return xs[i]
    }else{
      void null
    }
  }
  return null
}

function filter(fn,xs) {
  var r = []
  for(var i=0;i<arr.length;i++){
    if(fn(xs[i])){
      r.push(xs[i])
    }else{
      void null
    }
  }
  return r
}

function reject(fn,xs) {
  var r = []
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i]) == false){
      r.push(xs[i])
    }else{
      void null
    }
  }
  return r
}

function all(fn,xs) {
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i]) == false) return false
    else void null
  }
  return true
}

function any(fn,xs) {
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i]) == true) return true
    else void null
  }
  return false
}

function not(a) {return !a}

// origin、target均为object，将target合并到origin中，origin改变、target不变
function merge(origin,target) {
  if(isObject(target)){
    var r = origin
    for(var key in target){
      if(key in origin){
        r[key] = merge(origin[key],target[key])
      }else{
        r[key] = target[key]
      }
    }
    return r
  }else{
    return target === undefined ? origin : target
  }
}

function cons(a,xs) {
  return [a].concat(xs)
}

function uniq(fn,xs) {
  return xs.length == 0 ? []
  : cons(xs[0],
    uniq(fn,xs.slice(1).filter(function (a) {
      return fn(a,xs[0]) == true})
    ))
}

function arrIsEmpty(xs) {
  return xs.length == 0
}


export default{
  isFunction:isFunction,
  isArray:isArray,
  isObject:isObject,
  isString:isString,
  isNumber:isNumber,
  isBoolean:isBoolean,
  toArray:toArray,
  parserUrl:parserUrl,
  paramConcatUrl:paramConcatUrl,
  jsonp:jsonp,
  getJSON:getJSON,
  postJSONToJSON:postJSONToJSON,
  putData:putData,
  getData:getData,
  head:head,
  tail:tail,
  each:each,
  map:map,
  find:find,
  filter:filter,
  reject:reject,
  all:all,
  any:any,
  not:not,
  merge:merge,
  cons:cons,
  uniq:uniq,
  arrIsEmpty:arrIsEmpty
}







 















