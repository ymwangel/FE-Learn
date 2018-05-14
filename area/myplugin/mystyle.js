(function (win,doc) {
  var defaultSettings = {
    color: "red",
    background: "blue",
    border: "2px solid #000",
    fontSize: "30px",
    width: "300px",
    borderRadius: "5px"
  }
  function SetStyles (options) {
    var self = this
    if(!options){
      throw new Error('请传入配置参数')
    }
    self = Object.assign(self,defaultSettings,options)
    self.container = doc.querySelector(self.container) || doc.querySelectorAll(self.container)
    self._changeStyles()
  }

  SetStyles.prototype = {
    _changeStyles : function(){
      var self = this
      for (var pro in self) {
        if(pro == "container"){
          continue
        }
        if(pro == 'text' && typeof self[pro] == 'string'){
          self.container.innerText = self[pro]
          continue
        }else if(pro == 'text' && typeof self[pro] == 'function'){
          self.container.innerText = self[pro]()
        }
        self.container.style[pro] = self[pro]
      }
    }
  }

  win.SetStyles = SetStyles

})(window,document)