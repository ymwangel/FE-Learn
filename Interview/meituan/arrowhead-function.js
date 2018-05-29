// 箭头函数
/**
1.箭头函数，解决this作用于问题：，因为箭头函数内

*/
// ES5:
$("#bt1").on('click',function(){
  console.log($(this))  // #bt1本身
})

$("#bt1").on('click',function(){
  setTimeout(function(){
    console.log($(this))  // 这里的this，指向window
  },100)
})

$("#bt1").on('click',function(){
  setTimeout( () => {
    console.log($(this))  //这里的this又重新指向了 #bt1 本身
  },100)
})

// 除了箭头函数，还有其他两种方法：

/**
1.使用bind()
2. 使用jquery的 $.proxy
*/

$("#bt1").on('click',function(){
  setTimeout(function(){
    console.log($(this))
  }.bind(this),100)
})

$("#bt1").on('click',function(){
  setTimeout($.proxy(function(){
    console.log($(this))
  },this),100)
})