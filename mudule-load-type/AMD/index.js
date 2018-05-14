// RequireJS是一个工具库，主要用于客户端的模块管理，它可以让客户端的代码分成一个个模块，实现异步或动态加载，从而提高代码的性能和可维护性。
/**
1.模块管理遵守AMD规范
2.基本思想：通过define方法，将代码定义为模块；通过require方法，实现代码的模块加载
3.每个模块放在一个单独的文件里
*/

// 1.首先，将require.js嵌入网页，就可以在网页中进行模块化编程了
// <script data-main="scripts/main" src="scripts/require.js"></script>
/**
注释：
1.data-main: 属性不可省略，用于指定代码所在的脚步稳健，例子中：为scripts子目录下的main.js文件。用户自定义的代码就放在这个main.js文件中
*/

// define方法：定义模块
/**
1.独立模块
2.非独立模块
*/
// 独立模块：
define({
  method1: function(){},
  method2: function(){}
})
// 等价写法：把对象写成一个函数，该函数的返回值就是输出的模块 :自由度高，可以在函数体内写一些模块初始化代码
define(function(){
  return {
    method1: function(){},
    method2: function(){}
  }
})

// 2.非独立模块：
/**
1.define方法的第一个参数是一个数组，
(1).成员：是当前模块所依赖的模块，只有先加载依赖模块，新模块才能正常运行。
(2). 一般情况，module1、module2模块指的是当前目录下的module1.js和module2.js文件，等同于写成['./module1','./module2']
2.define方法的第二个参数：是一个函数。
(1).参数与数组的成员一一对应
(2).函数必须返回一个对象，这个对象就是你定义的模块，供其他模块调用
*/
define(['module1', 'module2'], function(m1,m2){
  return {
    method: function(){
      m1.methodA()
      m2.methodB()
    }
  }
})

// 如果依赖模块过多：
define(
  function(require){
    var dep1 = require('dep1'),
        dep2 = require('dep2'),
        dep3 = require('dep3'),
        dep4 = require('dep4'),
        dep5 = require('dep5');
        ... 
  }
)

// define实际运用的例子：
define(['math','graph'],function(){
  return {
    plot: function(x,y){
      return graph.drawPie(math.randomGrid(x,y))
    }
  }
})

// 另一个实例：通过判断浏览器是否为IE，而选择加载 zepto 或者 jQuery

define (('__proto__' in {} ? ['zepto'] : ['jquery']), function($) {
  return $
})

// require方法：调用模块：
/**
require: 方法的第一个参数，是一个表示依赖服务的数组
require 方法也可以用在define内部
*/
require (['foo', 'bar'], function(foo, bar) {
  foo.doSomething()
})
require ([ window.JSON ? undefined : 'util/json2' ], function(JSON){
  JSON = JSON || window.JSON
  console.log(JSON.parse('{"JSON": "HERE"}'))
})
define(function (require) {
  var otherModule = require('otherModule')
})
// 如何动态加载模块
define(function( require) {
  var isReady = false, foobar
  require(['foo', 'bar'],function(foo,bar){
    isReady = true
    foobar = foo()+ bar()
  })
  return {
    isReady: isReady,
    foobar: foobar
  }
})
// 模块的输出结果是一个promise对象
define(['lib/Deferred'], function(Deferred){
  var defer = new Deferred()
  require(['lib/templates/?index.html', 'lib/data/stats'], function(template, data) {
    defer.resolve({template: template, data: data})
  })
  return defer.promise()
})

// 如果服务器端采用JSONP模式，可以直接在require中调用，方法是在指定JSONP的callback参数为define
require(['http://someapi.com/foo?callback=define'], function(data){
  console.log(data)
})
// require方法允许添加第三个参数，即错误处理函数
require(['backbone'], function(Backbone) {
  return Backbone.View.extend({})
},function(err){
  console.log(err)
})
// require 还可以监听Error事件
requirejs.onError = function(err){
  
}

/**
配置require.js ：config方法 参数：
1. paths：指定各个模块的位置。可以是服务器上的相对位置，也可以是外部网址，指定本地文件路径时，可以省略文件最后的js后缀名
2. baseUrl： 指定本地模块位置的基准目录，即本地模块的路径是相对于哪个目录的，该属性通常由require.js加载时的data-main属性指定
3. shim: 有些库不是AMD兼容的，这时就需要指定shim属性的值。shim可以理解成“垫片”，用来帮助require.js加载非AMD规范的库
*/

// 代码中backbone和underscore就是非AMD的库，shim指定它们的依赖关系（backbone依赖于underscore），以及输出符号（backbone为“Backbone”，underscore为“_“）
require.config({
  paths: {
    jquery: [
      '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js',
      'lib/jquery'
    ],
    "backbone": 'vendor/backbone',
    "underscore": "vendor/underscore"
  },
  shim: {
    "backbone": {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    "underscore": {
      exports: "_"
    }
  }
})
// 上面代码加载了jquery模块，因为jquery的路径已经在paths参数中定义了，所以，就会到事先设定的位置下载
require(['jquery'], function($){

})















