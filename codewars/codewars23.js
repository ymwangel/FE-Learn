/**
Find All Array Values That Within a Given Difference

[5, 32, 5, 1, 31, 70, 30, 8]
new GroupByDifference(numbers).find(2), [5,5,30,31,32]
*/
            
// class GroupByDifference {
//   constructor(array){
//     this.array = array.sort((a,b) => a-b>0)
//   }
//   find(num) {
//     var xs = this.array
//     var re = []
//     if(xs.length == 0){
//       return []
//     }
//     for(let i =0; i<xs.length;i++){
//       var filterArr = xs.slice(i+1).filter(a => {
//         return Math.abs(a-xs[i]) <= Number(num)
//       })
//       filterArr.length > 0 ? re.push([xs[i]].concat(filterArr)) : []
//     }
//     re = re.sort((a,b) => a.length - b.length > 0)
//     var res = re.slice(0)
//     console.log(res)
//     for(let i=0;i<re.length-1;i++) {
//       for(let j=i+1;j<re.length;j++){
//         if(this.isContain(re[i],re[j])){
//             res[i] = null
//         }
//       }
      
//     }
//     res = res.filter(item => item!= null).reduce((a,b) => a.concat(b)) 
//     return res
//   }
//   isContain(a,b) {
//     if(a.length<b.length){
//       [a,b] = [b,a]
//     }
//     for(let i=0;i<b.length;i++){
//         if(a.indexOf(b[i]) == -1){
//             return false
//         }
//     }
//     return true
//   }
// }
// let g = new GroupByDifference([7, 10, 14, 15, 47, 54, 61, 66])
// console.log(g.find(7))





