// 去除字符串中的连续空格、'puke' 、 'hiccup' --7kyu

function wdm(talk){
  return talk.replace(/(puke|hiccup)/g,'').split(' ').filter(item => item != '').join(' ')
}
console.log(wdm("happiness wise words peace words peace happiness happiness peace peace wisdom happiness happiness happiness peace wise hiccup"))