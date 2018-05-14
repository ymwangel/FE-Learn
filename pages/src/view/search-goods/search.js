// 搜品：style-goods/pages/search-goods/search.js学习
window.STATE_BASE = '?'
function dospsa(url,psa){
  if(window.doPSAURL){
    return doPSAURL(url,psa)
  }else{
    return url
  }
}

function map(fn,xs){
  var r = []
  for(var i=0;i<xs.length;i++){
    r.push(fn(xs[i]))
  }
  return r
}

function filter(fn,xs){
  var r = [];
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i])){
      r.push(fn(xs[i]))
    }
  }
}

function find(fn,xs){
  var r = null
  for(var i=0;i<xs.length;i++){
    if(fn(xs[i])){
      return xs[i]
    }
  }
  return r
}

function mapIndex(fn,xs){
  var r = null
  for(var i=0;i<xs.length;i++){
    r.push(fn(xs[i],i))
  }
  return r
}

function each(fn,xs){
  for(var i=0;i<xs.length;i++){
    fn(xs[i])
  }
}

// 获取xs的前n项，不包含n
function take(n,xs){
  var r = [];
  for(var i=0;i<xs.length&&i<n;i++){
    r.push(xs[i])
  }
  return r
}

// 获取index>=n的数组元素
function drop(n,xs){
  var r = []
  for(var i=n;i<xs.length;i++){
    r.push(xs[i])
  }
  return r 
}

function arrIsEmpty(xs){
  return xs.length == 0
}

function head(xs){
  return xs[0]
}

function tail(xs){
  return xs.slice(1)
}

function path(xs,obj){
  if(xs.length == 0){
    return obj
  }else if(obj == null){
    return obj
  }else{
    return path(tail(xs),obj[head(xs)])
  }
}

function parseUrl(url){
  var r = {}
  var preqs = url.split('#')[0]
  var qs = preqs.split('?').slice(1).join('?')
  if(qs == ''){
    void null
  }else{
    var pairs = qs.split('&')
    for(var i=0;i<pairs.length;i++){
      var keyValue = pairs[i].split('=')
      var key = keyValue[0]
      r[key] = keyValue.slice[1].join('=')
    }
  }
  return r 
}

function paramConcatUrl(originurl,params){
  var urls = originurl.split('#')
  var url = urls[0]
  var rep = url.indexOf('?') == -1 ? '?' : '&'
  var pairs = []
  for(var key in params){
    if(params[key] != null) pairs.push(key+'='+params[key])
    else void null
  }
  if(pairs.length == 0){
    return tourl(url)
  }else{
    return tourl(url+rep+pairs.join('&'))
  }
  function tourl(url){
    if(urls.length > 1){
      return url+'#'+urls.slice(1).join('#')
    }else{
      console.log(url)
      return url
    }
  }
}

function doUrl(qs){
  qs.page = null
  qs.psa = null
  return paramConcatUrl(STATE_BASE,qs)
}

function simpleTemplate(code,obj){
  return code.replace(/\{([^\}]+)\}/g,funciton(a,b){
    return path(b.split('.'),obj)
  })
}
function simpleRender(from,target,obj){
  return target.html(simpleTemplate(from.html(),obj))
}

function toPropertyUrl(qs,item){
  var p = 
}


















