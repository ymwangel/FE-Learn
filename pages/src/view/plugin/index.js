;(function ($,window,document) {
  // Data
  var pluginName = 'buttonPluign',
  //配置默认参数 default settings
  defaults = {
    buttonClass:'',
    text:'按钮',
    clickBtn:function(element){}
  };

  //The actual pluign constructor
  function Pluign (options){
    this.settings = $.extend(defaults,options || {});
    this.name = pluginName;
    this._defaults = defaults;
  }
  Pluign.prototype = {
    init:function(){
      var button = document.createElement("button");
      var _button = $(button);
      _button.addClass(this._defaults.buttonClass);
      _button.html(this._defaults.text);
    }
  }
  $.fn[pluginName] = function (el,options){
    var e = this;
    e.each(function(){
      $.data(e,'pluign_' + pluginName ,new Pluign(this,options));
    });
    return e;
  }
})(jQuery,window,document)