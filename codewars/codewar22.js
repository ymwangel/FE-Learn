/**
Write a function to check that the Boards is a validSolution
board: 二维数组
*/

function validSolution(board){
  function isContain0(arr) {
    return arr.filter(item => item.filter(a => a === 0))
  }
  function isRow1to9(arr){
   return isContain0(arr) (new Set(arr)).size === 9 && Math.max(...arr)===9 && Math.min(...arr) === 1 
  }
}