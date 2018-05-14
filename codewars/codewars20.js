// Length of missing array --6kyu
function getLengthOfMissingArray(arrayOfArrays) {
  if(arrayOfArrays == null || arrayOfArrays.length == 0){
    return 0
  }else{
    var result = arrayOfArrays.map(function (item) {
      return item == null ? 0 : item.length
    }).sort(function (a,b) {
      return a-b
    })
    return result[0] == 0 ? 0 : result.filter(function(a,i) {
        return a != (result[0]+i)
      })[0]-1
  }
}

function getLengthOfMissingArray1(arrayOfArrays) {
  const lengths = (arrayOfArrays || [])
    .map(a => a ? a.length : 0)
    .sort((a, b) => a - b)
  
  if (lengths.includes(0)) {
    return 0
  }
  for (let i = 0; i < lengths.length - 1; i++) {
    if (lengths[i] + 1 !== lengths[i + 1]) {
      return lengths[i] + 1
    }
  }

  return 0
}




console.log(getLengthOfMissingArray([ [ 1, 2 ], [ 4, 5, 1, 1 ], [ 1 ], [ 5, 6, 7, 8, 9 ]] ))
console.log(getLengthOfMissingArray([ [ null ], [ null, null, null ]]))
console.log(getLengthOfMissingArray1([[3],
[4, 2],
[],
[2, 2, 4, 2, 3],
[1, 0, 0, 3],
[2, 2, 0],
[1, 0, 3, 3, 3, 0, 0],
[3, 4, 0, 3, 0, 2, 1, 3]]))