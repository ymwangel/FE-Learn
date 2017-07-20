(function(){
  var jcropApi
  $("#img-origin").Jcrop({
    allowSelect: true,
    baseClass: 'jcrop',
    onChange:function(){
    },
    onSelect:function(){
      var obj = jcropApi.tellSelect()
      var style="width:"+obj.w+"px;height:"+obj.h+"px;"+"position:absolute;top:0;left:0;background:url('http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg');"+"background-position:-"+obj.x+"px -"+obj.y+"px;"
      $(".img-cut").get(0).setAttribute('style',style)
    },
    onDblClick:function(){
    },
    onRelease:function(){
    }
  },function(){
    jcropApi = this
  })
})()