//递归渲染列表
(function (exports,STATE_AREA) {
  var div = $(".input-box")
  var obj = {
    province: '',
    city: '',
    region: '',
    provinceIndex: '',
    cityIndex: '',
    regionIndex: '',
    provinceObj: null,
    cityObj: null
  }
  
  //显示--隐藏地区列表
  div.find("[data-input]").on('click', function() {
    if (!div.hasClass('t')) {
      div.find("[data-type=province]").addClass('t').siblings().removeClass('t')
      currentType = 'province'
      div.addClass('t')
      renderLists('province')
    } else {
      div.removeClass('t')
    }
  })

  //点击“省”
  div.find("[data-type=province]").on('click', function(){
    let _this = $(this)
    currentType = "province"
    _this.addClass('t').siblings().removeClass('t')
    renderLists('province')
  })

  //点击“市”
  div.find("[data-type=city]").on('click', function(){
    let _this = $(this)
    if(obj.province === ''){
      return
    }else {
      _this.addClass('t').siblings().removeClass('t')
      currentType = 'city'
      renderLists('city')
    }
  })

  //点击“地区”
  div.find("[data-type=region]").on('click', function(){
    let _this = $(this)
    if(obj.province === '' || obj.city === ''){
      return
    }else {
      _this.addClass('t').siblings().removeClass('t')
      currentType = 'region'
      renderLists('region')
    }  
    
  })

  //点击列表中的li
  div.find('.con-lists').on('click', function(event) {
    var _this = $(event.target)
    var a = currentType+'Index'
    obj[currentType] = _this.html()
    obj[a] = _this.attr("idx")
    _this.addClass('active').siblings().removeClass('active')
    if(currentType === 'province'){
      currentType = 'city'
      div.find("[data-type=city]").addClass('t').siblings().removeClass('t')
      obj.provinceObj = filterObj(obj.province, STATE_AREA)[0]
      renderLists('city')
    }else if (currentType === 'city') {
      currentType = 'region'
      div.find("[data-type=region]").addClass('t').siblings().removeClass('t')
      obj.cityObj = filterObj(obj.city, obj.provinceObj.list)[0]
      renderLists('region')
    }else {
      div.find('.input').val(obj.province+'/'+obj.city+'/'+obj.region)
      div.removeClass('t')
    }
  })

  // function clickType (type, bool) {
  //   div.find("data-type="+type+"]").on('click', function () {
  //     var _ = $(this)
  //     if(bool){
  //       _.addClass('t').siblings().removeClass('t')
  //     }else {
  //       return 
  //     }
  //   })
  // }

  function renderLists(type) {
    var typeIndex = type+'Index'
    if(type === 'province'){
      div.find(".con-lists").html(map(function(item, index){
        return '<li title="'+item.name+'" class="" idx="'+index+'">'+item.name+'</li>'
      },STATE_AREA))
    }else if(type === 'city') {
      div.find(".con-lists").html(map(function(item, index){
        return '<li title="'+item.name+'" class="" idx="'+index+'">'+item.name+'</li>'
      },obj.provinceObj.list))
    }else {
      div.find(".con-lists").html(map(function(item, index){
        return '<li title="'+item.name+'" class="" idx="'+index+'">'+item.name+'</li>'
      },obj.cityObj.list))
    }
    div.find('[idx="'+obj[typeIndex]+'"]').addClass('active').siblings().removeClass('active')
  }

  function filterObj(name,obj){
    return filter(function(item){
        return item.name === name
      },obj)
  }

  function map (fn,xs) {
    var r = []
    for(var i=0; i<xs.length; i++) {
      r.push(fn(xs[i], i))
    }
    return r
  }

  function filter (fn, xs) {
    var r = []
    for(let i = 0; i < xs.length; i++){
      if(fn(xs[i])){
        r.push(xs[i])
      }else {
        void null
      }
    }
    return r
  }

}(this,STATE_AREA))