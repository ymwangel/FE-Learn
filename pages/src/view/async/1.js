function loadScript(src,fn){
  var node = document.createElement("script");
  node.setAttribute('async','async');
  var timeID
  var supportLoad = "onload" in node
  var onEvent = supportLoad ? "onload" : "onreadystatechange"
  node[onEvent] = function onLoad() {
      if (!supportLoad && !timeID && /complete|loaded/.test(node.readyState)) {
          timeID = setTimeout(onLoad)
          return
      }
      if (supportLoad || timeID) {
          clearTimeout(timeID)
          fn(null,node);
      }
  }
  document.querySelector("head").appendChild(node);
  node.src=src;
  node.onerror=function(e){
      fn(e);
  }
}
loadScript('2.js',function(){
    console.log("add success")
  })