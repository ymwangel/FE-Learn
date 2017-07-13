(function (){
  function main(){
    watchScroll()
    getInfo($("[nav-list]"))
  }



  function getInfo(div){
    div.find("[list-item]").on("click",function(){
      var isHave = div.hasClass("itemActive")
      var index = $(this).index()
      if(isHave){
        $(this).siblings().removeClass("itemActive")
      }else{
        $(this).addClass("itemActive").siblings().removeClass("itemActive")
      }
      scrollToPosition($("[info]").eq(index),div)
    })
  }

  function scrollToPosition(targetDiv,div){
    $(document.body).scrollTop(targetDiv.offset().top-60)
  }

  function watchScroll(){
    $(window).scroll(function(){
      if($(document).scrollTop() >= 43){
        $("[topNav]").addClass("fixed")
        console.log($(".trade").offset().top)
        // $(".company-name").show()
        // $("[btn-contact]").show()
      }else{
        $("[topNav]").removeClass("fixed")
        // $(".company-name").hide()
        // $("[btn-contact]").hide()
      }
    })
  }

  main()
})()