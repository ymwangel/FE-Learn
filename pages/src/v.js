// 使用v.js时，需引入： import v form v.js的路径

//[[(a --> Boolean),(a --> ())]]
function vitem(vs.data){
  for(var i=0;i<vs.length;i++){
    var v = vs[i]
    var arg = null
    if(data.type == 'multiple'){
      arg = data.value
    }else{
      arg = data
    }
    if(v[0](arg)){
      return v[1](data)
    }else{
      continue
    }
  }
  return true
}

// String --> Boolean
function isBlank(str){
  if (str == null) return true
  if (str.trim == null) return true   //没有trim()：不是字符串
  if (str.trim() == '') return true
  return false
}

// Number --> ({length:Number} --> Boolean)
function minLength (n){
  return function (a){
    return a.length < n
  }
}

function maxLengthIs(n){
  return function (a){
    return a.length <= n
  }
}

//String -->Boolean
function isNumber(str){
  return /^[0-9]+$/.test(str)
}

function noChinese (str){
  return !/^[\u4E00-\u9FA5]+$/.test(str)
}

function noPhoneStart (str){
  return !/^(13|15|14|17|18).*$/.test(str)
}

// String --> String
function trim(str){
  return str.trim()
}

function isLetter(str){
  return /^[a-zA-Z]+$/.test(str)
}

function scroll(id){
  if(document.querySelector){
    let ele = document.getElementById(id)
    let top = ele.offsetTop
    window.scroll(0,top)
  }
}

export default{
  vitem,
  isBlank,
  maxLength,
  maxLengthIs,
  minLength,
  notNumber: str => !isNumber(str),
  notChinese,
  isNumber,
  trim,
  notPhoneStart,
  isLetter,
  scroll
}








