(function(){
  var jQuery = function () {
    return new jQuery.prototype.init()
  }

  jQuery.prototype = {
    constructor: jQuery,
    init: function(){
      this.query = 1.0
      return this
    },
    jquery: 2.0,
    each: function(){
      console.log('each')
      return this
    }
  }

  jQuery()

})()