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
}())