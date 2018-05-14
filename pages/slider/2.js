(function () {
  var div = $("[container]")
  var box = div.find(".box")
  var arr = [
    "https://medici.wuage.com/image/151003210439216671147313900292.png",
    "https://medici.wuage.com/image/15094987833322301736653316766.png",
    "https://medici.wuage.com/image/15107297194049627843885682523.png"
  ]
  init(div,arr)
  var scrollN = 1
  var origin = 584
  var timer = null
  var len = arr.length
  var first_el = div.find('[idx=1]')
  var last_el = div.find('[idx='+len+']')

  box.append(first_el.get(0).outerHTML)
  box.prepend(last_el.get(0).outerHTML)

  carousel()
  div.hover(function(){
    timer = null
  },function(){
    carousel()
  })
  // scrollN:表示当前页数：
  // scrollN=1:表示当前第一屏
  // scrollN=N:表示当前是第二平
  // carousel()，3000ms后，scrollN才会++
  function carousel() {
    timer = setInterval(function () {
      if(scrollN<=len-1){
        box.animate({left:-(scrollN+1)*origin})
        scrollN++
        $(".tab").find('[idx='+scrollN+']').addClass('tab-active').siblings().removeClass('tab-active')
      }else{
        box.animate({left:-(scrollN+1)*origin},function() {
          scrollN=1
          box.css({left:-scrollN*origin})
          $(".tab").find('[idx=1]').addClass('tab-active').siblings().removeClass('tab-active')
        })
      }
    },3000)
  }
  div.find('.tab').on('click','li',function (e) {
    var idx = $(this).attr('idx')
    $(this).addClass('tab-active').siblings().removeClass('tab-active')
    if(idx!=scrollN){
      box.animate({left:-idx*origin})
    }else{
      void null
    }
    scrollN = idx
  })
  function init(div,arr) {
    div.find('.box').html(mapIndex(_render,arr).join(''))
    div.find('.tab').html(mapIndex(_renderTab,arr).join(''))
    function _render(item,i) {
      return ['<li idx="' + (i+1) + '"">','<img src="' + item + '"">','</li>'].join('')
    }
    function _renderTab(item,i) {
      if(i == 0){
        return '<li class="tab-active" idx="' + (i+1)+ '"></li>'
      }else{
        return '<li idx="' + (i+1) + '"></li>'
      }
      
    }
  }
  function map (fn,xs) {
    var r = []
    for(var i=0; i<xs.length; i++){
      r.push(fn(xs[i]))
    }
    return r
  }
  function mapIndex (fn,xs) {
    var r = []
    for(var i=0; i<xs.length; i++){
      r.push(fn(xs[i],i))
    }
    return r
  }
})()

