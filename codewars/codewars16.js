// write number in expanded form
function expandedForm(num) {
  var arr = (''+num).split('')
  var back = arr.slice(0).reverse()
  console.log(arr)
  console.log(back)
  var r = ''
  for(var i=0;i<arr.length;i++){
    r += arr[i]*Math.pow(10,i)
  }
  return r 
}

console.log(expandedForm(12))