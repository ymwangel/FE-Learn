(function(){
  document.getElementById('printBtn').addEventListener('click',function(){
    var list = document.getElementsByClassName("list")[0]
    printElement(list)
  })
  function printElement(div,customClass){
    var originClassName = div.className
    if(customClass != null){
      div.className += ' ' + customClass
    }else{
      void null
    }
    var iframeStyle = 'display:none;'
    var iframe = document.createElement('iframe')
    iframe.setAttribute("style",iframeStyle)
    document.body.appendChild(iframe)
    var doc = iframe.contentWindow.document
    var cssArr = document.querySelectorAll('link[rel=stylesheet]')
    each(function(ele){
      doc.write(ele.outerHTML)
    },cssArr)
    doc.write(div.outerHTML)
    var iframeWindow = iframe.contentWindow

    doc.write('<script>document.execCommand("print")</script>')
    div.className = originClassName
    setTimeout(function(){
      if(iframe.remove){
        iframe.remove()
      }else{
        void null
      }
    },1000)
  }
  function each(fn,xs){
    for(var i=0;i<xs.length;i++){
      fn(xs[i])
    }
  }
})()
