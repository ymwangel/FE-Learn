// 给定一个由整数构成的数组，将数组中的每个元素放大10倍，使用递归
// 递归：取出list第一个元素，对剩下的元素组成的list应用同样的方法
function scaleArray(array) {
  function cons (a,arr) {
    return [a].concat(arr)
  }
  return array.length == 0 ? [] : cons(head(array)*10,scaleArray(tail(array)))
  //当array.length = 0 的时候，一定返回空数组[]，否则会多出一个元素
}
function head (arr) {
  return arr[0]
}
function tail (arr) {
  return arr.slice(1)
}

function unique (array) {
  function cons (a,arr) {
    return [a].concat(arr)
  }
  return array.length == 0 ? [] : cons(head(array),unique(tail(array).filter(a => a != head(array))))
}

function fib (n) {
  return n == 1 ? 1
        :n == 2 ? 1
        : fib(n-1) + fib(n-2)
}




console.log(scaleArray([1,2,4,5,2]))
console.log(unique([1,2,4,5,2]))
console.log(fib(10))
