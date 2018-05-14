(function() {
  var el = $('[sn-expand]')
  el.on('change','[sn-choose-item]',function(){
    console.log(1)
  })
  $("#add").on('click',function(){
    el.append($('<li class="ml" style="height:50px;width:50px;overflow:scroll;word-wrap:break-word">sdfsdfsdsdfsdfsdfsdsdfsdfsdfsdsdfsdfsdfsdsdfsdfsdfsdsdfsdfsdfsdsdf</li>'))
  })
  document.querySelector(".sn-expand").addEventListener('scroll',function(e){
    debugger
    if(e.target.className == 'ml'){
      console.log('ml')
    }
  })
  // document.querySelector(".ml").addEventListener('click',function(e){
  //   console.log('ml')
  // })
  document.querySelector(".sn-expand").addEventListener('click',function(e){
    if(e.target.className == 'ml'){
      console.log('ml')
    }
  })

  $(".sn-expand").on('click','.ml',function(){
    debugger
  })
  $(".sn-expand").on('scroll','.ml',function(){
    debugger
  })
}())

// addEventListener不可以给未来元素代理scroll事件。click事件可以