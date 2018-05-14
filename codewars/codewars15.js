// All unique 
// 给定一个字符串，判断是否字符串中的每个字符都是unique -- 7kyu
function hasUniqueChars(str){
  return new Set(str).size == str.length
}