function solution(digits){
  var str = ''+digits
  var arr = str.split('').sort().reverse()
  if(str.length == 5){return digits}
  for(var i=0;i<arr.length;i++){
    var index = str.indexOf(arr[i])
    if(str.slice(index).length>=5){
      return Number(str.slice(index).slice(0,5))
    }
  }
}

function solution1(digits){
  var str = ''+digits
  if(str.length == 5){
    return digits
  }
  var arr = str.split('').sort().reverse()
  for(var i=0;i<arr.length;i++){
    var index = str.indexOf(arr[i])
    if(getStr(index)){
      return Number(getStr(index))
    }else{
      void null
    }
  }

  function getStr(maxOfIndex) {
    return str.slice(maxOfIndex).length>=5 ? str.slice(maxOfIndex).slice(0,5) : false
  }
}



console.log(solution1(91992))
