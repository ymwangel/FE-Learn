/*如何监听一个对象的变化*/
let data = {
  user: {
    name: 'ymwangel',
    age: '24'
  },
  address: {
    city: 'beijing'
  },
  tel: '15726625366'
}

function Observer(data) {
  this.data = data
  this.walk(data)
}

let p = Observer.prototype

p.walk = function (obj){
  let val 
  for( let key in obj){
    if(obj.hasOwnProperty(key)) {
      val = obj[key]
    }
    if(typeof val === 'object') {
      new Observer(val)
    }

    this.convert(key,val) 
  }
}

p.convert = function(key, val) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('获取' + key)
      return val
    },
    set: function(newVal) {
      console.log('更新了' + key)
      if(newVal == val) return
      if(typeof newVal === 'object') new Observer(newVal)
      val = newVal
    }
  })
}



let app = new Observer(data)

// data.job = 'IT'
console.log(data.tel)
data.tel = {tel: '15726625366'}
// console.log(data.job)
console.log(data.tel)
