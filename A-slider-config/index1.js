//递归渲染列表
(function (exports) {
  function Swiper (options) {
    this._options = options
    this._init(options)
  }

  Swiper.prototype._init = function (options) {
    this.imgLists = options.imgLists
    this.parentId = options.parentId
    this.class = options.class
    this.delay = options.delay
    this.isAutoSlider = options.isAutoSlider
    this.timer = null
    this.count = 1
    var listHtml = ''
    for(let i=0;i<this.imgLists.length;i++){
      listHtml = listHtml +  ['<li class="swi-li">','<img src="'+this.imgLists[i]+'" alt="">','</li>'].join('')
    }
    listHtml += ['<li class="swi-li">','<img src="'+this.imgLists[0]+'" alt="">','</li>'].join('')
    var html = [
      '<div class="swi-box" swi-box>',
      '<ul class="swi-ul" swiUl>',
      '</ul>',
      listHtml,
      '<ul class="swi-quote" swi-quote>',
      '</ul>',
      '</div>'
    ].join('')
    document.querySelector("#"+this.parentId).innerHTML = html
    this.timer = this.sw()
  }

  Swiper.prototype.sw = function () {
    var div = $("[swi-box]")
    var ul = $("[swiUl]")
    var qu = $("[swi-quote]")
    return setInterval(function(){
      ul.animate({left: "-"+this.count+"00%"}, function(){
        if(this.count >= 4){
          ul.css({left:0})
          this.count = 0
        }
        qu.find("[qu-idx="+this.count+"]").addClass("qu-active").siblings().removeClass("qu-active")
        this.count++
      })
    },2000)
  } 


}(this))