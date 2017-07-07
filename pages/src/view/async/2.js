(function(){
  console.log(1)
  /*document.write：异步加载2.js，2.js中使用document.write()会warn：2.js:3 Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.*/
  // 而且，并不会写入内容
  // document.write('<span style="color:red;">Hello</span>')
  // document.write：end

  var container = document.getElementById("container");
  var content = document.createElement("span");
  debugger
  content.style.color = "red";
  content.innerHTML = "Hello";
  container.appendChild(content);
})()