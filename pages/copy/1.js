//low copy
var a = {}
var b = a
a.name="xiaosi"
function copy(obj){
  var c = {}
  for(var prop in obj){
    c[prop] = obj[prop]
  }
  return c
}
var c= copy(a)
c.age="24"
// console.log(c,b,a)
// console.log(a==c)

//deep copy
var china = {
  nation : '中国',
  birthplaces:['北京','上海','广州'],
  skincolr :'yellow',
  friends:['sk','ls']
}

//递归
function deepCopy(obj,r){
  var r = r||{}
  for(var i in obj){
    if(typeof obj[i] == 'object'){
      if(Object.prototype.toString.call(obj[i]) == '[object Array]'){
        //数组
        r[i]=[]
      }else{
        //对象
        r[i]={}
      }
      deepCopy(obj[i],r[i])
    }else{
      r[i]=obj[i]
    }
  }
  return r
}

// console.log(deepCopy(china))

//JSON解析解决

var test ={
  name:{ 
    xing:{ first:'张',second:'李'},
    ming:'老头'
  }, 
  age :40,
  friend :['隔壁老王','宋经纪','同事']
}
var _json = JSON.parse(JSON.stringify(test))
_json.age = '30'
console.log(_json,test)


























