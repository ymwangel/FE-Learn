// 需求：给定字符串：str，合并首尾空格，str中间的space（空格）用URI编码代替（%20）,前提：不用正则表达式：str.trim().replace(/\s+/g,'%20')
// 例如：" A  B "  =>  "A%20B"

function  urlify (str) {
  return str.trim().replace(/\s+/g, "%20")
}

function urlify1(str) {
  
}

console.log(urlify('  A     B  '))