// String incrementer  -- 5kyu

function incrementString (strng) {
  if(strng == ''){
    return 1
  }else{
    var len = strng.length
    var last = strng[len-1]
    if(last.search(/[0-9]/) != -1){
      var ad = Number(last)+1
      if(ad < 10){
        return strng.slice(0,len-1)+ad
      }else{
        return incrementString(strng.slice(0,len-1))+'0'
      }
    }else{
      return strng+1
    }
  }
}

function incrementString1(input) {
  if(isNaN(parseInt(input[input.length-1]))) return input+'1'
  return input.replace(/(0*)[0-9]+$/,function (match,p1,p2) {
    console.log(match)
    console.log(p1)
    console.log(p2)
    var up = parseInt(p2)+1
    return up.toString().length > p2.length ? p1.slice(0,-1) + up : p1+up
  })
}

function incrementString2(input) {
  return input.replace(/\d*$/,function (n) {
    var x = ~~n + 1
    return ('0000000' + x).slice(-Math.max(n.length,String(x).length))
  })
}

function incrementString3(input) {
  return input.replace(/([0-8]?)(9*)$/,function (s,d,ns) {
    return +d +1 + ns.replace(/9/g,'0')
  })
}

function incrementString4(string) {
  var m = string.match(/^(\w*?)(\d*)$/)
  var next = (parseInt('0'+m[2],10)+1)+''
  return m[1] + m[2].slice(0,-next.length)+next
}


























console.log(incrementString("fo12obar009"))
console.log(incrementString('foo'))
console.log(incrementString("foobar001"))
console.log(incrementString("foobar99"))
console.log(incrementString("foobar099"))