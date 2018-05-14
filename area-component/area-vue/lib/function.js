/* 
author: qzl

这里面的函数是通用函数请保持浏览器原生支持的语法,
*/

function isFunction(a){
  return typeof a === 'function'
}
function isArray(a){
  return Object.prototype.toString.call(a) == '[object Array]'
}
function isObject(a){
  return Object.prototype.toString.call(a) === '[object Object]'
}
function isString(a){
  return Object.prototype.toString.call(a) ==='[object String]'
}
function isNumber(a){
  return Object.prototype.toString.call(a) ==='[object Number]'
}
function isBoolean(a){
  return Object.prototype.toString.call(a) ==='[object Boolean]'
}

function toArray(a){
  return [].slice.call(a)
}

function parseUrl(url){
  var r = {}
  var preqs = url.split('#')[0]
  var qs = preqs.split('?').slice(1).join('?')
  var pairs = qs.split('&')
  for(var i=0;i<pairs.length;i++){
    var keyValue = pairs[i].split('=')
    var key = keyValue[0]
    r[key] = keyValue.slice(1).join('=')
  }
  return r
}

function paramConcatUrl(originurl,params){
  var urls = originurl.split('#')
  var url = urls[0]
  var rep = url === "" ? "" 
  : url.indexOf('?') == -1 ? '?' 
  : '&'
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
    return tourl(url + rep + pairs.join('&'))
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
  uid:new Date - 0
}


function jsonp(url,param,callbackName){
  return new Promise(function(ok,cancel){
    callbackName = callbackName || 'jsonpCallback'
    var script = document.createElement('script')
    script.setAttribute('async','async')
    var name = ['diqye',STATE_CALLBACK.uid++].join('')
    STATE_CALLBACK[name] = function(data){
      delete STATE_CALLBACK[name]
      document.body.removeChild(script)
      ok(data)
    }
    param[callbackName] = ['STATE_CALLBACK.',name].join('')
    script.src = paramConcatUrl(url,param)
    script.onerror = function(e){
      cancel(e)
    }
    document.body.appendChild(script)
  })
}

function getJSON(url,param){
  param = param || {}
  param.__ = new Date - 0
  function createReq(){
    if(window.XMLHttpRequest){
      return new XMLHttpRequest()
    }else{
      return new ActiveXObject('MSXML2.XMLHTTP')
    }
  }
  return new Promise(function(ok,canel){
    var req = createReq()
    req.open("GET", paramConcatUrl(url,param), true);  
    req.onreadystatechange = function(){  
        if(req.readyState == 4){  
          if(req.status == 200){  
            ok(JSON.parse(req.responseText))
          }else{  
              canel(req)
          }  
        }  
    }  
    req.send(null); 
  })
}
function postJSON(url,param){
  function createReq(){
    if(window.XMLHttpRequest){
      return new XMLHttpRequest()
    }else{
      return new ActiveXObject('MSXML2.XMLHTTP')
    }
  }
  return new Promise(function(ok,canel){
    var req = createReq()
    req.open("POST", url, true)
    req.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8')
    req.onreadystatechange = function(){  
        if(req.readyState == 4){  
          if(req.status == 200){  
            ok(JSON.parse(req.responseText))
          }else{  
              canel(req)
          }  
        }  
    }
    req.send(paramConcatUrl('',param))
  })
}
function postJSONToJSON(url,param){
  function createReq(){
    if(window.XMLHttpRequest){
      return new XMLHttpRequest()
    }else{
      return new ActiveXObject('MSXML2.XMLHTTP')
    }
  }
  return new Promise(function(ok,canel){
    var req = createReq()
    req.open("POST", url, true)
    req.setRequestHeader('Content-Type','application/json; charset=utf-8')
    req.onreadystatechange = function(){  
        if(req.readyState == 4){  
          if(req.status == 200){  
            ok(JSON.parse(req.responseText))
          }else{  
              canel(req)
          }  
        }  
    }  
    req.send(JSON.stringify(param)); 
  })
}
function partial(fn,args){
  return function(){
    var narg = [].slice.call(arguments)
    return fn.apply(null,args.concat(narg))
  }
}
function curryN(n,fn){
  return function(){
    var narg = [].slice.call(arguments)
    if(n > narg.length){
      return curryN(n-narg.length,partial(fn,narg))
    }else{
      return fn.apply(null,narg)
    }
  }
}

function curry(fn){
  return curryN(fn.length,fn)
}

var overi  = curry(function overi_(key,fn,obj){
  if(isArray(key)){
    var keys = key
    if(keys.length == 0){
      return obj
    }else if(keys.length == 1){
      return overi(keys[0],fn,obj)
    }else{
      var h = keys[0]
      var tail = keys.slice(1)
      return overi(h
        ,alway(overi(tail,fn, obj[h]==null?{}:obj[h]))
        ,obj)
    }
  }else if(isString(key)){
    return _fn(fn)
  }else{
    throw "key 只支持数组和字符串"
  }

  function _fn(fn){
    var r = {}
    if(key in obj){
      void null
    }else{
      r[key] = fn()
    }
    for(var okey in obj){
      if(obj.hasOwnProperty(okey)){
        if(okey == key){
          r[okey] = fn(obj[okey])
        }else{
          r[okey] = obj[okey]
        }
      }else{
        void null
      }
    }
    return r
  }
})
function alway(a){
  return function(){
    return a
  }
}
var over = curry(function over_(key,val,obj){
  return overi(key,alway(val),obj)
})
function putData(name,value){
  try{
    localStorage.setItem(name,JSON.stringify(value))
  }catch(a){
    window.console&&window.console.log(a)
  }
}
function getData(name){
  try{
    return JSON.parse(localStorage.getItem(name)||'null')
  }catch(a){
    window.console&&window.console.log(a)
  }
}
function cons(a,xs){
  return [a].concat(xs)
}
function uniq(fn,xs){
  return xs.length == 0 ? []
  : cons(xs[0],
    uniq(fn,
      xs.slice(1).filter(function(a){return fn(a,xs[0])==false})
      ))
}
function pipe(){
  var fns = [].slice.call(arguments)
  function _fn(fns){
    return function(){
      var arg = [].slice.call(arguments)
      var result = fns[0].apply(null,arg)
      for(var i=1;i<fns.length;i++){
        result = fns[i].apply(null,[result])
      }
      return result
    }
  }
  return _fn(fns)
}
function pip(arg){
  return pipe.apply(null,[].slice.call(arguments).slice(1))(arg)
}
var find = curry(function find_(fn,xs){
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i])){
      return xs[i]
    }else{
      void null
    }
  }
  return null
})
var filter = curry(function filter_(fn,xs){
  var r = []
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i])){
      r.push(xs[i])
    }else{
      void null
    }
  }
  return r
})

var reject = curry(function reject_(fn,xs){
  var r = []
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i])==false){
      r.push(xs[i])
    }else{
      void null
    }
  }
  return r
})

var map = curry(function map_(fn,xs){
  var r = []
  for(var i=0;i<xs.length;i++){
    r.push(fn(xs[i]))
  }
  return r
})

var all = curry(function all_(fn,xs){
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i]) == false) return false
    else void null
  }
  return true
})
var any = curry(function any_(fn,xs){
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i]) == true) return true
    else void null
  }
  return false
})
var append = curry(function append_(a,b){
  return b.concat(a)
})
function id(a){return a}
function not(a) {return !a}
var merge = curry(function merge_(origin,target){
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
})
var prop = curry(function prop_(name,obj){
  return obj[name]
})
function fst(pair){
  return pair[0]
}
function snd(pair){
  return pair[1]
}
function head(xs){
  return xs[0]
}
function tail(xs){
  return xs.slice(1)
}
var foldl = curry(function foldl_(fn,init,xs){
  var r = init
  for(var i=0;i<xs.length;i++){
    r = fn(r,xs[i])
  }
  return r
})
var foldl1 = curry(function foldl1_(fn,xs){
  return foldl(fn,xs[0],tail(xs))
})

export default {
  head:head,
  tail:tail,
  foldl:foldl,
  foldl1:foldl1,
  isFunction:isFunction,
  isArray,
  isString,
  parseUrl:parseUrl,
  paramConcatUrl:paramConcatUrl,
  jsonp:jsonp,
  putData:putData,
  getData:getData,
  curry:curry,
  partial:partial,
  curryN:curryN,
  over:over,
  pipe:pipe,
  pip:pip,
  overi:overi,
  uniq:curryN(2,uniq),
  cons:curryN(2,cons),
  find:find,
  filter:filter,
  reject:reject,
  getJSON:getJSON,
  postJSON:postJSON,
  map:map,
  all:all,
  any:any,
  id:id,
  append:append,
  not:not,
  alway:alway,
  merge:merge,
  fst,
  snd,
  toArray,
  prop,
  postJSONToJSON
}