(function (argument) {
  var timer = null
  var count = 1
  var _this = this
  var div = $("[swi-box]")
  var ul = $("[swiUl]")
  var qu = $("[swi-quote]")
  swiper()
  div.mouseover(function(){
    clearInterval(timer)
  })
  div.mouseout(function(){
    swiper()
  })
  div.find('[swi-quote]').on('click','li',function(e){
    $(this).addClass("qu-active").siblings().removeClass("qu-active")
    var index = $(e.target).attr('qu-idx')
    count = index
    ul.animate({left: "-"+count+"00%"})
  })

  function swiper(){
    return timer = setInterval(function(){
      ul.animate({left: "-"+count+"00%"}, function(){
        if(count >= 4){
          ul.css({left:0})
          count = 0
        }
        qu.find("[qu-idx="+count+"]").addClass("qu-active").siblings().removeClass("qu-active")
        count++
      })
    },2000)
  }


}())