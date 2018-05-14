(function () {
  var scrollN = 0;
  var len = $('.item').length
  $('[scroll-left]').on('click',function() {
    if(scrollN == 0){
      scrollN = len-1
      setPage(scrollN)
    }else{
      scrollN--
      setPage(scrollN)
    }
  })
  $('[scroll-right]').on('click',function() {
    if(scrollN >= len-1){
      scrollN = 0
      setPage(scrollN)
    }else{
      scrollN++
      setPage(scrollN)
    }
  })
  function setPage(n) {
    var unit = 200
    $('.box').css({
      left:0-n*200
    })
  }
})()