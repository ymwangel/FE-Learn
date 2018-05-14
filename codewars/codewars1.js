// 需求：给定一个字符串，如果，字符串中有相同的字母（不区分大小写），返回false，否则，返回true；空字符串，返回true
function cons (a,arr) {
  return [a].concat(arr)
}

function unique (array) {
  return array.length == 0 ? [] : cons(array[0],unique(array.slice(1).filter(a => a != array[0])))
}

function isIsogramRecursion (array) {
  return array.length == unique(array.map( a => a.toLowerCase())).length ? true : false
}


function isIsogram(str) {
  var backend = []
  for(var i=0;i<str.length;i++){
    if(backend.indexOf(str[i].toLowerCase()) != -1){
      return false
    }else{
      backend.push(str[i].toLowerCase())
    }
  }
  return true
}

function isIsogram1 (str) { 
  return !str || str.toLowerCase().split('').every(function (v,i,arr) {
    return arr.indexOf(v) == i
  })
}

function isIsogram2(str) {
  return !str || str.length == new Set(str.toLowerCase()).size
}

function isIsogram3 (str) {
  let value = true;
  str.toLowerCase().split('').sort().map((letter, index, array) => {
    if (letter === array[index + 1]) value = false;
  });
  return value;
}

function isIsogram4 (str) {
  return str == '' ? true 
    : str.split('').every(item => str.match(new RegExp(item,'gi')).length <= 1)
}

function isIsogram5 (str) {
  var value = str.toLowerCase()
  for(let i in value){
    if(value.splice(parseInt(i) + 1).indexOf(value[i]) != -1){
      return false
    }
  }
  return true
}

function isIsogram6 (str) {
  return [].every.call(str,function (l) {
    return str.match(new RegExp(l,'gi')).length == 1
  })
}

function isIsogram7 (str) {
  // \w : 匹配字母、数字、下划线
  // .  : 匹配除了换行符以外的任何字符
  // *  : （贪婪）重复零次或更多
  // \1 : 代表与第一个小括号中要匹配的内容相同
  // /i : 不区分大小写

  return !/(\w).*\1/i.test(str)
}

function  isIsogram8 (str) {
  if(!str){
    return ''
  }
  return  (str.split('')[0].concat(isIsogram8(str.slice(1).split('').filter(a => a != str[0]).join('')))).length
}

console.log(isIsogramRecursion(''.split('')))













