(function(exports,PAGE_DATA) {
  function parserUrl(url) {
    var r = {}
    var preqs = url.split('#')[0]
    var qs = preqs.split('?').slice(1).join('?')
    if(qs == ''){
      void null
    }else{
      var pairs = qs.split('&')
      for(var i=0;i<pairs.length;i++){
        var keyValue = pairs[i].split('=')
        var key = keyValue[0]
        r[key] = keyValue.slice(1).join('=')
      }
    }
    return r
  }
  function arrIsEmpty(xs) {
    return xs.length == 0
  }
  function mapIndex(fn,xs){
    var r = []
    for(var i=0;i<xs.length;i++){
      r.push(fn(xs[i],i))
    }
    return r
  }
  function getData(key) {
    return localStorage.getItem(key) || null
  }
  function doUrl(qs){
    qs.page = null
    qs.psa = null
    return paramConcatUrl(PAGE_DATA.stateBase,qs)
  }
  function paramConcatUrl(originurl,params) {
    var urls = originurl.split('#')
    var url = urls[0]
    var rep = url.indexOf('?') == -1 ? '?' : '&'
    var pairs = []
    for(var key in params){
      if(params[key] != null){
        pairs.push(key + '=' + encodeURIComponent(params[key]))
      }else{
        void null
      }
    }
    if(pairs.length == 0){
      return tourl(url)
    }else{
      return tourl(url + rep + pairs.join('&'))
    }
    function tourl(url) {
      if(url.length>1){
        return url + '#' + urls.slice(1).join('#')
      }else{
        return url
      }
    }
  }
  var CONST_HISTORY_CITY = 'HISTORY_CHOOSED_CITY'
  function doChoosedCity(){
    var qs = parserUrl(window.location.href)
    var qsname = decodeURIComponent(qs.province)
    var qscity = decodeURIComponent(qs.city)
    var choosedCityDom = document.querySelector("#choosed-city")
    var allAreaDom = document.querySelector("#all-area")
    if(qscity != 'undefined' && qscity){
      choosedCityDom.innerHTML = qscity
      choosedCityDom.setAttribute('title',qscity)
    }else if(qsname != 'undefined' && qsname){
      choosedCityDom.innerHTML = qsname
      choosedCityDom.setAttribute('title',qsname)
    }else{
      choosedCityDom.innerHTML = '所有地区'
      choosedCityDom.setAttribute('title','所有地区')
      allAreaDom.classList.add("all-area-choosed");
    }
  }
  function handlerArea(div,areaObj,allarea){
    if(areaObj == null){
      return
    }
    var qs = parserUrl(window.location.href)
    doChoosedCity()
    var pstr = renderMunicipality(areaObj.PROVINCE_LEVEL_MUNICIPALITY) + renderItem(areaObj.PROVINCE,'province')
    div.find("#id-area-parent").html(pstr)
    // getLocalCity()
    operateHistory()

    var lis = div.find("#id-area-parent").find('[idx]')
    lis.each(function(item) {
      var s = ['<li class="city-part fl" city-idx=',
              Math.floor(item/5),
              '>',
              '<div class="d-icon trangle"></div>',
              '<div class="list-holder"></div>',
              '<ul class="down-list clearfix"></ul></li>'
              ].join('')
      if((item+1)%5==0 || item == lis.length-1){
        $(this).css("marginRight",'0')
        $(this).after($(s))
      }else{
        void null
      }
    })
    var sub = div.find('[city-idx]')
    div.hover(function () {
      var qs = parserUrl(window.location.href)
      $(".area-content").show()
      if($('[history-area]').css('display') == 'none'){
        $('[area-seperate]').hide()
      }else{
        $('[area-seperate]').show()
      }
      if(qs.city != undefined){
        qs.province = decodeURIComponent(qs.province)
        qs.city = decodeURIComponent(qs.city)
        if(qs.province == qs.city && qs.province != "吉林"){
          mapIndex(function(a,index){
            if(a.provinceName == qs.province){
              div.find('[muni-idx='+index+']').find('a').css({color:'#316ccb'})
            }
          },areaObj.PROVINCE_LEVEL_MUNICIPALITY)
        }else{
          var rc = filter(function(item){
            return item.provinceName == qs.province
          },areaObj.PROVINCE)
          var index = areaObj.PROVINCE.indexOf(rc[0])
          handler(qs.province,rc[0].cityList,index,qs.city)
          var i = rc[0].cityList.indexOf(qs.city)
          if(i != -1){
            sub.find(".city>a").eq(i).css({color:'#316ccb'})
          }else{
            void null
          }
        }
      }else if(qs.province != undefined && qs.city == undefined){
        qs.province = decodeURIComponent(qs.province)
        var rc = filter(function(item){
          return item.provinceName == qs.province
        },areaObj.PROVINCE)
        var index = areaObj.PROVINCE.indexOf(rc[0])
        handler(qs.province,rc[0].cityList,index,qs.city)
        sub.find(".city-item").eq(0).find('a').css({color:'#316ccb'})
      }else{
        sub.hide()
      }
    },function() {
      // $(".area-content").hide()
      var qs = parserUrl(window.location.href)
    })

    div.find("#id-area-parent").on('click','li[idx]',function(e) {
      // debugger
      var index = $(this).attr('idx')
      var cities = areaObj.PROVINCE[index].cityList
      qs.province = $(this).html()
      handler(qs.province,cities,index,'')
    })

    sub.find('.down-list').on('click','li',function (e) {
      var index = $(this).index()
      var city = $(this).find('a').html()
      if(index == 0){
        putHistory({
          type:'province',
          province:qs.province,
          city:qs.province
        })
      }else{
        putHistory({
          type:'city',
          province:qs.province,
          city:city
        })
      }
    })

    div.find('#id-area-parent').on('click','li[muni-idx]',function(e){
      var provinceName = $(this).find('a').html()
      putHistory({
        type:'province',
        province:provinceName,
        city:provinceName
      })
      qs.province = provinceName
      qs.city = provinceName
      qs.selectSource = 1
      var url = doUrl(qs)
      window.location.href = dopsa(url,{psa:'j9',areaPSA:'a201'})
    })

    allarea.on('click',function(c){
     qs.province = null
     qs.city = null
     qs.selectSource = 1
     var url = doUrl(qs)
     window.location.href = dopsa(url ,{psa:'j9',areaPSA:'a201'})
    })

    function handler(province,cities,index,city){
      var city = city || ''
      qs.province = province
      var po = $("[idx]").eq(index).get(0)
      qs.city = null
      var url = doUrl(qs)
      var res = null
      var res = ['<li class="city-item fl"><a href="',url,'" target="_self">全部</a></li>',renderItem(cities,'city')].join('')
      div.find('[city-idx='+Math.floor(index/5)+']').find('.down-list').html(res)
      div.find('[city-idx]').each(function(item){
        if(item == Math.floor(index/5)){
          $(this).show()
        }else{
          $(this).hide()
        }
      })
      var trangleStyle = {
        position:'relative',
        left:(po.offsetLeft-20)+'px',
        top:0
      }
      var holderStyle= {
        position:'relative',
        left:(po.offsetLeft-17)+'px',
        top:'-2px'
      }
      var downListStyle = {
        position:'relative',
        left:0,
        top:'-3px'
      }
      div.find('[city-idx='+Math.floor(index/5)+']').find('.trangle').css(trangleStyle)
      div.find('[city-idx='+Math.floor(index/5)+']').find('.list-holder').css(holderStyle)
      div.find('[city-idx='+Math.floor(index/5)+']').find('.down-list').css(downListStyle)
    }
    function operateHistory(){
      var h = $("[history-list]")
      var hObj = getHistory()
      if(hObj.length==0){
        $('[history-area]').hide()
        return
      }else{
        var hstr = renderItem(hObj,'history')
        h.html(hstr)

      }
    }
    function renderMunicipality(xs){
      if(arrIsEmpty(xs)){
        return []
      }else{
        return '<li class="municipality-list"><ul>'+mapIndex(_r,xs).join('')+'</ul></li>'
      }
      function _r(item,index){
        qs.province = item.provinceName
        qs.city = item.cityList[0]
        qs.selectSource = 1
        var url = doUrl(qs)
        // return ['<li class="province-item fl" muni-idx="'+index+'">',item.provinceName,'</li>'].join('')
        return ['<li class="province-item fl" muni-idx="'+index+'">','<a href="'+url+'" target="_self">',item.provinceName,'</a>','</li>'].join('')
      }
    }

    function renderItem(xs,type){
      if(arrIsEmpty(xs)){
        return []
      }else{
        return mapIndex(_render,xs).join('')
      }

      function _render(a,index){
        if(type == 'province'){
          qs.province = a.provinceName
          return ['<li class="province-item fl" idx="',index,'">',a.provinceName,'</li>'].join('')
        }else if(type == 'city'){
          qs.city = a
          qs.selectSource = 1
          var url = doUrl(qs)
          return ['<li class="city-item fl city" title="',a,'"><a href="',url,'">',a,'</a></li>'].join('')
        }else if(type == 'localCity'){
          qs.province = a.province
          qs.city = a.city
          qs.selectSource = 1
          var url = doUrl(qs)
          return ['<a href="',url,'">',a.city,'</a>'].join('')
        }else{
          qs.province = a.province
          qs.city = a.city
          qs.selectSource = 1
          if(a.type == 'province'){
            qs.city = ''
            var url = doUrl(qs)
            return ['<li class="history-item" title="',a.province,'"><a href="',url,'">',a.province,'</a></li>'].join('')
          }else{
            var url = doUrl(qs)
            return ['<li class="history-item" title="',a.city,'"><a href="',url,'">',a.city,'</a></li>'].join('')
          }
        }
      }
    }  
  }

  
  function doHistory(div){
    var historyArea = div.find('[keyword-history]')
    var jgc_url = div.attr('jgc-url')
    div.find('[input-completion]').focus(function(){
      if(!$(this).val()){
        getHistoryData('jgc',jgc_url)
      }
    })
    div.find('[input-completion]').on('input',function(){
      if($(this).val()){
        historyArea.html('')
      }else{
        void null
      }
    })
    div.find('[input-completion]').blur(function(){
      $("[keyword-history]").html('')
    })
    historyArea.get(0).addEventListener('mousedown',function(e){
      e.preventDefault()
    })
    historyArea.on('click','li',function(e){
      var _this = $(this)
      var h_jgc = getData('jgc') || []
      h_jgc.unshift(_this.html())
      var qs = parserUrl(window.location.href)
      putData('jgc',unique(h_jgc).slice(0,10))
      var new_url = simpleTemplate(jgc_url,{keywords:encodeURIComponent(_this.html())})
      window.location.href = dopsa(paramConcatUrl(new_url,{
        cdebug:qs.cdebug || null
      }),{psa:'j9',areaPSA:'a201'})
    })

    function getHistoryData(k,url){
      var h_jgc = getData(k) || []
      if(h_jgc.length > 0){
        _fn(h_jgc,url)
      }
      function _fn(h_jgc,url){
        historyArea.html(renderHistory(h_jgc,url))
      }
    }
    function renderHistory(xs,url){
      return mapIndex(function(item,i){
        return '<li idx="'+i+'">'+html2Escape(item)+'</li>'
      },xs).join('')
    }
  }

  function main() {
    handlerArea(document.querySelector('[area]'),PAGE_DATA.stateData,document.querySelector('#all-area'))
  }
  main()
})(this,PAGE_DATA)

