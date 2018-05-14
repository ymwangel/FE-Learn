// Rot13 -- 5kyu
function rot13(message){
  return message.split('').map(function(item) {
    return item.search(/[a-z,A-Z]/g) != -1 ? toItem(item) : item
  }).join('')

  function toItem(a) {
    var code = a.charCodeAt()
    if(code>=97 && code<=122){
      var rest=code-13
      return rest>=97 ? String.fromCharCode(rest) : String.fromCharCode(122-(13-(code-97))+1)
    }else if(code >= 65 && code <= 90){
      var rest=code-13
      return rest>=65 ? String.fromCharCode(rest) : String.fromCharCode(90-(13-(code-65))+1)
    }
  }
}

function rot13_1(message) {
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var b = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM"
  return message.replace(/[a-z]/gi, c => b[a.indexOf(c)])
}

function rot13_2(message) {
  return str.replace(/[a-z]/gi, letter => String.fromCharCode(letter.charCodeAt(0) + (letter.toLowerCase() <= 'm' ? 13: -13)));
}
console.log(rot13("test"))
console.log(rot13("Test"))