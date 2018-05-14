//递归渲染列表
(function (exports,STATE_AREA) {
  var obj = {
    province: '',
    city: '',
    region: '',
    provinceIndex: '',
    cityIndex: '',
    regionIndex: ''
  }
  var div = $(".input-box")
  var currentType = 'province'

  var objOfPro = filterObj(obj.province)
  function filterObj(name){
    return filter(function(item){
        return item.provinceName === name
      },STATE_AREA)
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
    console.log(currentType)
    obj[currentType] = _this.html()
    console.log(obj[currentType])
    var a = currentType+'Index'
    obj[a] = _this.attr("idx")
    _this.addClass('active').siblings().removeClass('active')
    if(currentType === 'province'){
      currentType = 'city'
      div.find("[data-type=city]").addClass('t').siblings().removeClass('t')
      renderLists('city')
    } else if (currentType === 'city') {
      currentType = 'region'
      div.find("[data-type=region]").addClass('t').siblings().removeClass('t')
      renderLists('region')
    }else {
      div.find('.input').val(obj.province+'/'+obj.city+'/'+obj.region)
      div.removeClass('t')
      // console.log(obj)
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
        return '<li title="'+item.provinceName+'" class="" idx="'+index+'">'+item.provinceName+'</li>'
      },STATE_AREA))
    }else if(type === 'city') {
      var r = filter(function(item){
        return item.provinceName === obj.province
      },STATE_AREA)
      console.log(r)
      div.find(".con-lists").html(map(function(item, index){
        return '<li title="'+item.cityName+'" class="" idx="'+index+'">'+item.cityName+'</li>'
      },r[0].cityList))
    }else {
      var r = filter(function(item){
        return item.provinceName === obj.province
      },STATE_AREA)
      console.log(r)

      var re = filter(function(item){
        return item.cityName === obj.city
      },r[0].cityList)
      console.log(re)
      div.find(".con-lists").html(map(function(item, index){
        return '<li title="'+item+'" class="" idx="'+index+'">'+item+'</li>'
      },re[0].region))
    }
    div.find('[idx="'+obj[typeIndex]+'"]').addClass('active').siblings().removeClass('active')
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