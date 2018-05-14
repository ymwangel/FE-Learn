// 龟A、龟B赛跑--6kyu
function race(v1, v2, g) {
  if(v1 >= v2){
    return null
  }else{
    var time = 0
    if(g == 0){
      time = 70/v1 + 70/(v2-v1)
    }else{
      time = g/(v2-v1)
    }
    var hour = Math.floor(time)
    var minues = Math.floor((time-hour)*60)
    var seconds = Math.floor(((time-hour)*60-minues)*60)
    return [hour,minues,seconds]
  }
}

console.log(race(720, 850, 70))
console.log(race(80, 91, 37))
console.log(race(80, 100, 40))
console.log(race(18,20,0))