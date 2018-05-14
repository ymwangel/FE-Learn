//判断字符串是否全部包含[A-Z]，至少一次，不区分大小写 -- 6kyu

function isPangram(string){
  var arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  var flag = true
  string = string.toLowerCase()
  for(var i=0;i<arr.length;i++){
    if(string.indexOf(arr[i]) == -1){
      flag = false
    }else{
      void null
    }
  }
  return flag
}

function isPangram1(string) {
  string = string.toLowerCase()
  return "abcdefghijklmnopqrstuvwxyz".split("").every(function(x){
    return string.indexOf(x) !== -1;
  })
}

function isPangram2(string) {
  return 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .every((x) => string.toLowerCase().includes(x));
}

function isPangram3(string) {
  return !(new Set(string.replace(/[^a-z]/ig, '')).size < 26)
}

function isPangram4(string) {
  return (string.match(/([a-z])(?!.*\1)/ig) || []).length === 26
}

console.log(isPangram3("The quick brown fox jumps over the lazy dog."))
console.log(isPangram3("This is not a pangram."))



