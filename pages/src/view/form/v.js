function isEmpty(value){
  if(value || value == null){
    return value
  }
}
function isNumber(value){
  return (/^[0-9]+$/).test(value)
}
function isNumberOrLetter(value){
  return (/^[0-9a-zA-Z]$/).test(value)
}
function isExceedMaxLength(value,len){
  return value.length > len ? true : false
}

export default{
  isEmpty,
  isNumber,
  isNumberOrLetter,
  isExceedMaxLength
}
