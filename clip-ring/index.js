(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('ju', ['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    root.ju = factory(root.jquery);
  }
})(this, function () {
  function CircularScrollBar (options) {
    this.container = document.querySelector('#'+options.container)
    this.value = options.value
    this.color = options.color
    this.backColor = options.backColor
    this.radius = options.radius
    this.valueColor = options.valueColor
  }
  CircularScrollBar.prototype.constructor = CircularScrollBar,
  CircularScrollBar.prototype.init = function(){
    var html = [
    '<div class="box">',
      '<div class="clip">',
        '<div class="left"></div>',
        '<div class="right width-none"></div>',
      '</div>',
      '<div class="num">',
      '</div>',
    '</div>'].join('')
    this.container.innerHTML = html
    let clip = document.querySelector('.clip'),
    box = document.querySelector('.box'),
    left = document.querySelector('.left'),
    right = document.querySelector('.right'),
    num = document.querySelector('.num'),
    rotate = 0;

    box.style.setProperty("width",this.radius+"px")
    box.style.setProperty("height",this.radius+"px")

    clip.style.setProperty("clip", "rect(0, "+this.radius+"px, "+this.radius+"px, "+this.radius/2+"px)")
    left.style.setProperty("width",this.radius+"px")
    left.style.setProperty("height",this.radius+"px")
    left.style.setProperty("clip", "rect(0, "+this.radius/2+"px, "+this.radius+"px, 0)")
    right.style.setProperty("height",this.radius+"px")
    right.style.setProperty("clip", "rect(0, "+this.radius+"px, "+this.radius+"px, "+this.radius/2+"px)")
    num.style.setProperty("width",(this.radius-20)+"px")
    num.style.setProperty("height",(this.radius-20)+"px")
    num.style.setProperty("line-height",(this.radius-20)+"px")

    num.style.color = this.valueColor
    left.style.borderColor = this.color
    right.style.borderColor = this.color
    box.style.backgroundColor = this.backColor
    clip.style.borderColor = this.backColor
    
    let loop = setInterval(() => {
      if(rotate >= this.value){
        rotate = 0;
        clearInterval(loop)
        return 
      } else if(rotate > 50){
        right.classList.remove('width-none');
        right.style.setProperty("width",this.radius+"px")
        clip.classList.add('auto');
        clip.style.setProperty("clip","auto")
      }
      rotate++;
      left.style.transform = 'rotate('+ 3.6*rotate + 'deg)';
      // num.innerHTML = `${rotate}%`
      num.innerHTML = rotate + '%'
    },10)
    return this
  }
  
  window.CircularScrollBar = CircularScrollBar;
});