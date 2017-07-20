(function(exports){
  
  function map(fn,xs){
    var r = []
    for(var i=0;i<xs.length;i++){
      r.push(fn(xs[i]))
    }
    return r
  }
  function filter(fn,xs){
    var r = []
    for(var i=0;i<xs.length;i++){
      if(fn(xs[i])){
        r.push(xs[i])
      }
    }
    return r
  }
  function find(fn,xs){
    var r = null
    for(var i=0;i<xs.length;i++){
      if(fn(xs[i])){
        return xs[i]
      }
    }
    return r
  }
  function mapIndex(fn,xs){
    var r = []
    for(var i=0;i<xs.length;i++){
      r.push(fn(xs[i],i))
    }
    return r
  }
  function each(fn,xs){
    for(var i=0;i<xs.length;i++){
      fn(xs[i])
    }
  }
  function take(n,xs){
    var r = []
    for(var i=0;i<xs.length&&i<n;i++){
      r.push(xs[i])
    }
    return r
  }
  function drop(n,xs){
    var r = []
    for(var i=n;i<xs.length;i++){
      r.push(xs[i])
    }
    return r
  }
  function arrIsEmpty(xs){
    return xs.length == 0
  }
  function head(xs){
    return xs[0]
  }
  function tail(xs){
    return xs.slice(1)
  }
  function path(xs,obj){
    if(xs.length == 0) {
      return obj
    }else if(obj == null){
      return obj
    }else{
      return path(tail(xs),obj[head(xs)])
    }
  }

  function scroller(div,page){
    var currentPage = 1
    if(page <= 1){
      div.find('[functionbar]').hide()
    }else{
      div.find('[functionbar]').show()
    }

    div.find("[left-action]").on('click',function(){
      if(currentPage == 1){
        void null
      }else{
        currentPage -= 1
        setContent(currentPage-1)
      }
    })
    div.find("[right-action]").on('click',function(){
      if(currentPage >= page){
        void null
      }else{
        currentPage += 1
        setContent(currentPage-1)
      }
    })
    function setContent(n){
      var content = div.find('[scroll-content]')
      var unit = parseInt(content.attr('scroll-content'))
      content.css({
        left:(0-n*unit) + 'px'
      })
    }
  }

  function main(){
    scroller($('[scroller]'),parseInt($('[scroller]').attr('page')))
  }
  main()
}(this))