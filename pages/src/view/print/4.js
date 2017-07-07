
function filter(fn,xs){
  var r = [];
  for(var i=0;i<xs.length;i++){
    r.push(fn(xs[i]))
  }
  return r
}

function each(fn,xs){
  for(var i=0;i<xs.length;i++){
    fn(xs[i])
  }
}

var arr = [1,4343,6576]
// each(function(value){
//   console.log(value+1)
// },arr)
filter(function(ele){
  var index = arr.indexOf(ele)
  console.log(index)
  if(ele != 1){
    arr.splice(index)
  }
},arr)
console.log(arr)



