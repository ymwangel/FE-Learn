// 两个数组的元素的和--8kyu
function arrayPlusArray(arr1, arr2) {
  return arr1.reduce((prev,next)=> prev+next)+arr2.reduce((prev,next)=> prev+next)
}

function arrayPlusArray(arr1, arr2) {
  return arr1.concat(arr2).reduce((prev,next)=> prev+next)
}

console.log(arrayPlusArray([1, 2, 3], [4, 5, 6]))