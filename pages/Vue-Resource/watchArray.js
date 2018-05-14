/*如何监听一个数组的变化*/
/**
 思路：通过重新包装数据中数组的push、pop等常用方法。并不是改变js原生Array中的原型方法
*/

const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
const arrayAugmentations = []
aryMethods.forEach( (method) => {
  let original = Array.prototype[method]
  arrayAugmentations[method] = function () {
    console.log('我被改变了')
    return original.apply(this, arguments)
  }
})

let list = ['a', 'b', 'c']
list.__proto__ = arrayAugmentations
list.push('d')
// console.log(list.toString())

let list2 = ['a', 'b', 'c']
list2.push('d')
// console.log(list2.toString())