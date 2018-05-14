var arr = [5, 32, 5, 1, 31, 70, 30, 8].sort()
var re = []
for(let i =0; i<arr.length;i++){
  var filterArr = arr.slice(i+1).filter(a => {
    return Math.abs(a-arr[i]) <= 2
  })
  filterArr.length > 0 ? re.unshift([arr[i]].concat(filterArr)) : []
}

var res = re.slice(0)
for(let i=0;i<re.length-1;i++) {

  if(isContain(re[i],re[i+1])){
      res[i] = null
  }
}
res = res.filter(item => item!= null).reduce((a,b) => a.concat(b))

console.log(res)

// 判断一个数组，是否包含在另一个数组中（仅限于数值数组）
function isContain(a,b) {
  if(a.length<b.length){
    [a,b] = [b,a]
  }
  for(let i=0;i<b.length;i++){
      if(a.indexOf(b[i]) == -1){
          return false
      }
  }
  return true
}