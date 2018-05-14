// 给出一个数组，含3个元素，判断能否组成三角形，如果能组成三角形，判断是锐角、直角、钝角三角形--7kyu
function obtRhtAct(sideLen) {
  return !isTriangle() ? -1 
          : isObtuse() ? 0
          : isRight() ? 1 : 2
  function isTriangle() {
    return (sideLen[0]+sideLen[1]>sideLen[2] && sideLen[0]+sideLen[2]>sideLen[1] && sideLen[2]+sideLen[1]>sideLen[0]) ? true : false
  }

  function isRight() {
    return (sideLen[0]*sideLen[0]+sideLen[1]*sideLen[1]==sideLen[2]*sideLen[2] || sideLen[0]*sideLen[0]+sideLen[2]*sideLen[2]==sideLen[1]*sideLen[1] || sideLen[2]*sideLen[2]+sideLen[1]*sideLen[1]==sideLen[0]*sideLen[0]) ? true : false
  }

  function isObtuse() {
    return (sideLen[0]*sideLen[0]+sideLen[1]*sideLen[1]<sideLen[2]*sideLen[2] || sideLen[0]*sideLen[0]+sideLen[2]*sideLen[2]<sideLen[1]*sideLen[1] || sideLen[2]*sideLen[2]+sideLen[1]*sideLen[1]<sideLen[0]*sideLen[0]) ? true : false
  }

}

function obtRhtAct1(sideLen) {
  sideLen = sideLen.sort()

  var obtuse = sideLen[0]*sideLen[0] + sideLen[1]*sideLen[1] < sideLen[2]*sideLen[2] 
  var right = sideLen[0]*sideLen[0] + sideLen[1]*sideLen[1] == sideLen[2]*sideLen[2] 
  var acute = sideLen[0]*sideLen[0] + sideLen[1]*sideLen[1] > sideLen[2]*sideLen[2] 

  return sideLen[0]+sideLen[1]<sideLen[2] ? -1 
          : obtuse ? 0 
          : right ? 1 : 2
}

console.log(obtRhtAct1([12,13,5]))
