// JS规范模块：AMD、CMD、CommonJS

// 1.CommonJS：NodeJS 采用 CommonJS：加载模块：
/**
适合服务端、因为在服务端读取模块都是在本地磁盘，加载速度很快。
如果在客户端，会造成 “假死” 状况，例如：clock的调用必须等待clock.js请求成功，加载完毕（js加载是阻塞的）。（同步加载）
*/
var clock = require('clock')
clock.start()

// 2.AMD：（Asyncchronous Modules Defintion）：是异步地加载模块。
// requireJs应用了AMD，先定义所有依赖，然后在加载完成后的回调函数中执行
/**
AMD:  虽然实现了异步加载，但是开始就把所有依赖写出来，是不符合书写的逻辑顺序的
*/

require([module],callback)
// 用AMD写上一个模块
require（['clock'],function (clock) {
  clock.start()
}

// 3.CMD：（Common Module Defition），是seajs 推崇的规范，CMD则是依赖就近，用的时候再require，而且是异步的
define(function (require,exports,module) {
  var clock = require('clock')
  clock.start()
})

// 4.UMD：通用模块定义：
/**

*/

(function (root, factory) {
  
  if(typeof define == 'function' && define.amd) {
    // AMD
    define(['jquery'], factory)
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('jquery'))
  } else {
    root.returnExports = factory(root.jQuery)
  }

}(this, function ($) {
  function myFunc() {}

  return myFunc
}))


/**
封装插件方式：
1.使用闭包方式：（不判断AMD、CommonJS）

*/

// 1.使用闭包方式：
/**
1. 在定义插件之前添加一个分号，可以解决js合并时可能会产生的错误问题
2. undefined在老一辈的浏览器中是不被支持的，直接使用会报错，js框架要考虑到兼容性，因此增加一个形参undefined，
3. 把window对象作为参数传入，是避免了函数执行时到外部去查找 
*/
;(function (global, undefined) {
  var plugin = {
    add: function (n1, n2) {
      
    }
    ...
  }
  // 最后将插件对象暴露给全局对象
  'plugin' in global && global.plugin = plugin
})

/**
将window直接传进去，不妥当，因为插件并非一定应用在浏览器上
所以：不传参数，直接取当前的全局this对象作为顶级对象用
修改如下：
*/
;(function (global, undefined) {
  "use strict"
  var _global
  var plugin = {
    add: function (n1, n2) {
      return n1+n2
    }
    ...
  }
  // 最后将插件对象暴露给全局对象
  // (0, eval)('this')：用来获取当前的上下文对象
  _global = (function () {
    return this || (0, eval)('this')
  }())

  !('plugin' in _global) && (_global.plugin = plugin)
})

// 自执行函数有两种写法
(function () {
  
})()
// 或者 :常用
(function () {
  // body...
}())

// 使用模块化的规范包装
/**
1.判断是否存在加载器，如果存在，就是用加载器；不存在，就是用顶级域对象
*/

if(typeof module !== "undefined" && module.exports) {
  module.exports = plugin
} else if (typeof define === 'function' && define.amd) {
  define(function () {
    return plugin
  })
} else {
  _global.plugin = plugin
}

// 完整的插件例子：plugin.js
;(function (undefined) {
  "use strict"
  var _global
  var plugin = {
    add : function (n1,n2) {
      return n1 + n2
    },
    sub: function (n1,n2) {
      return n1 - n2
    },
    mul: function (n1,n2) {
      return n1 * n2
    },
    div: function (n1,n2) {
      return n1 / n2
    },
    sur: function (n1,n2) {
      return n1 % n2
    }
  }
  // 最后将插件对象暴露给全局对象
  _global = (function () {
    return this || (0, eval)('this')
  }())

  if(typeof module !== 'undefined' && module.exports){
    module.exports = plugin
  } else if(typeof define === 'function' && define.amd) {
    define(function () {
      return plugin
    })
  } else {
    !('plugin' in _global) && (_global.plugin = plugin)
  }
})

// 引入插件之后，直接使用plugin对象即可：例如：
plugin.add(1,2)    //详见：FE-Learn/plugin/index.html

// 插件的默认参数：
function add(param) {
  var args = !!param ? Array.prototype.slice.call(arguments) : []
  return args.reduce(function (pre, cur) {
    return pre + cur
  }, 0)

  // arr.reduce(callback [,initialValue])
}

/**
健壮的js：
一些基本的状态参数添加到我们需要的插件上去
*/


//plugin.js
;(function (undefined) {
  "use strict"
  var _global

  function result(args, fn) {
    var argsArr = Array.prototype.slice.call(args);
    if(argsArr.length > 0) {
      return argsArr.reduce(fn)
    } else {
      return 0
    }
  }

  var plugin = {
    add: function () {
      return result(arguments, function(pre, cur) {
        return pre + cur
      })
    },
    sub: function () {
      return result(arguments, function(pre, cur) {
        return pre - cur
      })
    },
    mul: function () {
      return result(arguments, function(pre, cur) {
        return pre * cur
      })
    },
    div: function () {
      return result(arguments, function(pre, cur) {
        return pre / cur
      })
    },
    sur: function () {
      return result(arguments, function(pre, cur) {
        return pre % cur
      })
    }
  }

  _global = (function () {
    return this || (0, eval)('this')
  }())

  if(typeof module !== 'undefined' && module.exports) {
    module.exports = plugin
  } else if(typeof define === 'function' && define.amd) {
    define(function () {
      return plugin
    })
  }else {
    !('plugin' in _global) && (_global.plugin = plugin)
  }

}())

/**
插件的钩子：Hook
插件的链式调用：（利用当前对象）
1. 每个函数返回this（全局对象）
2. 利用原型链

*/

// 1.每个函数返回this
var plugin = {
  add: function(n1,n2) {return this},
  sub: function(n1,n2) {return this}
}

// 2.利用原型链
function Calculate() {
  
}

Calculate.prototype.add = function () {
  return this
}
Calculate.prototype.sub = function () {
  return this
}

// 假设：插件式对初始化参数进行运算并只输出结果：修改如下：
;(function (undefined) {
  "use strict"
  var _global

  function result(args, type) {
    var argsArr = Array.prototype.slice.call(args)
    if(argsArr.length == 0) return 0

    switch(type) {
      case 1 : return argsArr.reduce(function (p,c) {
        return p + c
      });
      case 2 : return argsArr.reduce(function (p,c) {
        return p - c
      });
      case 3 : return argsArr.reduce(function (p,c) {
        return p * c
      });
      case 4 : return argsArr.reduce(function (p,c) {
        return p / c
      });
      case 5 : return argsArr.reduce(function (p,c) {
        return p % c
      });
      default: return 0;
    }
  }

  function Calculate() { }

  Calculate.prototype.add = function () {
    console.log(result(arguments,1))
    return this
  }
  Calculate.prototype.sub = function () {
    console.log(result(arguments,2))
    return this
  }

  // 最后，将插件对象暴露给全局对象
  _global = (function () {
    return this || (0,eval)('this')
  })
  if(typeof module !== "undefined" && module.exports) {
    module.exports = Calculate
  }else if(typeof define === 'function' && define.amd){
    define(function () {
      return Calculate
    })
  }else {
    !('Calculate' in _global) && (_global.Calculate = Calculate)
  }

}())

// 调用插件
var plugin = new Calculate()
plugin.add(2,1).sub()


/**
https://static.wuage.com/common/modules/localStorage/src/localStorage.js ：插件代码学习

*/

/**
ctrl + shift + k：删除整行
ctrl + k : 删除光标之后对所有字符
shift + command + D：快速复制光标所在对一行
ctrl + shift + m :选中花括号里面的全部内容，但是不包括{}
shift + command + A :选中标签内的内容 但不包括标签，继续按回继续往上一层选择，可实时结构预览
shift + command + enter :光标前插入行
command + D: 选择单词，重复可增加选择下一个相同的单词
command + L：选择行，重复可依次增加选择下一行
command + x ： 删除当前行
ctrl + M：跳转到对应括号
command + N： 新建窗口
command + M： 最小化当前窗口
*/

// define([module-name?],[array-of-dependencies?],[module-factory-or-object])
// 详见： http://javascript.ruanyifeng.com/tool/requirejs.html
/**
module-name:模块标识符，可省略
array-of-dependencies: 所依赖的模块，可以省略
module-factoyr-or-object：模块的实现，或者一个javascript对象

*/

(function (root, factory) {
  // 判断模块加载方式
  if (typeof define === 'function' && define.amd ){
    define('fe/storage', [], factory)
  }else if( typeof module !== 'undefined' && module.exports ){
    module.exports = factory()
  } else {
    root.fe = root.fe || {}
    fe.storage = factory()
  }
})(this, function () {
  var Storage = function (origin, path) {
    this.origin = origin
    this.path = path
    this._iframe = null
    this._iframeReady = false
    this._queue = []
    this._request = {}
    this._id = 0
  }
  Storage.prototype = {
    op: {
      WRITE: 'W',
      READ: 'R',
      DEL: 'D',
      CLEAR: 'X'
    },
    constructor: Storage,
    init: function () {
      var that = this
      if( !this._iframe){
        if(window.postMessage && window.JSON && window.localStorage) {
          this._iframe = document.createElement('iframe')
          this._iframe.style.cssText = "display:none"
          document.body.appendChild(this._iframe)
          if(window.addEventListener) {
            this._iframe.addEventListener("load", function(){
              that._iframeLoaded()
            },false)
            window.addEventListener('message', function (event) {
              that._handleMessage(event)
            },false)
          }else if(this._iframe.attachEvent){
            this._iframe.attachEvent("onload", function(){
              that._iframeLoaded()
            },false)
            window.attachEvent('onmessage',function (event) {
              that._handleMessage(event)
            })
          }
        } else {
          throw new Error("Unsupported browser.")
        }
      }
      this._iframe.src = this.origin + this.path
    },
    getValue: function (key, callback) {
      this._toSend({
        key: key
      }, callback)
    },
    setValue: function(key,value,callback){
      this._toSend({
        key: key,
        op: this.op.WRITE,
        value: value,
      }, callback)
    },
    delValue: function(key,callback){
      this._toSend({
        key: key,
        op: this.op.DEL
      },callback)
    },
    clearValue: function(callback){
      this._toSend({
        op:this.op.CLEAR
      },callback)
    },
    _toSend: function(params, callback) {
      var data = {
        request: {
          key: params:key,
          id: ++this._id,
          op:params.op,
          value:params.value
        },
        callback: callback
      }
      if(this._iframeReady){
        this._sendRequest(data)
      }else {
        this._queue.push(data)
      }
      if(!this._iframe){
        this.init()
      }
    },
    _sendRequest: function(data) {
      this._requests[data.request.id] = data
      this._iframe.contentWindow.postMessage(JSON.stringify(data.request), this.origin)
    },
    _iframeLoaded: function(){
      this._iframeReady = true
      if(this._queue.length) {
        for(var i=0,len = this._queue.length; i<len; i++){
          this._sendRequest(this._queue[i])
        }
        this._queue = []
      }
    },
    _handleMessage: function(event){
      if(event.origin == this.origin) {
        var data = JSON.parse(event.data)
        this._requests[data.id].callback && this._requests[data.id].callback(data.key, data.value)
        delete this._requests[data.id]
      }
    }
  }
  return new Storage(window.location.protocol+"//static.wuage.com", "/common/modules/localStorage/storage.html")
})




































