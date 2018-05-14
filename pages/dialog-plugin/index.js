(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('ju', ['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    root.ju = factory(root.jquery);
  }
})(this, function () {
  return function (ele) {
    jsonp('/seller/ensure/version/uptodate',{},{
      success: function(data){
        if(data.success){
          var html = ['<div class="mod-cover" protocol>',
            '<div class="mod-protocol">',
            '<p class="protocol-title">',
            '<i class="d-icon close" close></i>',
            '</p>',
            '<div class="protocol-content" protocol-content>',
            '<p>为提升五阿哥钢铁平台采购市场繁荣，买家保障服务新增“一口价”订单保障，同意下方协议即可升级。升级后如不发布该类型商品，对原有买家保障服务无变化，请放心升级。',
            '<a href="xxx" target="_blank">升级规则说明</a>',
            '</p>',
            '<div class="pro-txt">',
            '</div>',
            '<button class="protocol-button" protocolbtn>同意升级买家保障服务</button>',
            '</div>',
            '<div class="ym-toast">',
            '</div>',
            '</div>',
            '</div>'].join('')

          var proHtml = '<p class="txt-header">《 买家保障服务协议2.0 》</p><h4>一、卖家声明与承诺</h4><p>（一）卖家确认在申请加入买家保障服务（以下称“本服务”）之前，已充分阅读、理解并接受本协议的全部内容，一旦加入本买家保障服务，即表示同意遵循本协议之所有约定。</p><p>（二）本协议内容包括协议正文、附件、正文提及的规则及所有五阿哥钢铁平台上关于已经发布或将来可能发布的各类规则，包括但不限于《平台总则》、《交易细则》、《买家保障服务规则》等）。所有这些规则都应视为本协议不可分割的组成部分，与协议正文具有同等法律效力。</p><p>（三）&nbsp;卖家同意五阿哥有权随时对本协议和规则内容进行单方面的补充和（或）变更，并在五阿哥钢铁平台以公告的方式予以公布，无需另行单独通知；若卖家在本协议内容变更后继续使用本服务的，包括但不限于维持所发布的商品信息，或继续发布商品信息等，即表示卖家已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容使用本服务；若卖家不同意修改后的协议内容，可停止使用本服务，并向五阿哥提交本协议终止申请。</p><p>（四）&nbsp;卖家声明在同意接受本协议并加入本服务时，应是具有法律规定的完全民事权利能力和民事行为能力，能够独立承担民事责任的法人或其他组织；本协议内容不受卖家所属国家或地区的排斥。不具备前述条件的，卖家应立即终止或停止使用本服务。</p><h4>一、定义 </h4><p>1、买家保障服务：指卖家确认接受本协议，且同意按本协议约定缴存不低于人民币10000元的保障金，根据本协议及五阿哥钢铁平台其他公示规则的规定，通过五阿哥钢铁平台发布商品信息，与五阿哥钢铁平台买家（以下称：“买家”）达成交易订单，并向买家出售商品时，承诺为买家的合法权益提供保障。买家和卖家就线上订单的履行有争议且无法协商一致的，买家可向五阿哥钢铁平台提出维权投诉，五阿哥钢铁平台在收到买家符合条件的投诉申请后，根据争议双方提交的相关证据，有权独立判断买家投诉是否成立。如五阿哥钢铁平台判定为卖家责任的，且卖家未在规定的期间内与买家就投诉事项达成一致并完成处理，则平台有权按照不超过当次争议订单总金额的10%且最高限额5000元，从卖家缴纳的保障金向买家支付，以保障买家合法权益。</p><p class="strong">买家保障服务是卖家向买家提供的服务，卖家是该服务的责任者，五阿哥不是责任者。</p><p>2、保障金：指卖家根据本协议约定的条款和条件及五阿哥钢铁平台其他公示规则的规定，缴存至五阿哥指定保障金账户，在卖家未履行买家保障服务承诺时，五阿哥扣除相应的金额赔付买家</p><h4>二、加入条件</h4><p>1、您应符合以下所有条件：</p><p>1.1.您已属于经五阿哥平台认证的钢铁拍档用户；</p><p>1.1.您已属于经五阿哥平台认证的钢铁拍档用户；</p><p>1.2.您同意并签订《买家保障服务协议》；</p><p>1.3.您已缴存不低于人民币10000元的保障金；</p><p>1.4.您于五阿哥钢铁平台开设店铺，符合五阿哥钢铁平台关于信息质量以及店铺、价格更新要求。</p><p>2、您应保证在本服务期限内始终具备上述条件，如五阿哥有合理怀疑且您无法提供充分的证据证明您未违反上述任一条件的，则五阿哥有权立即中止或终止本协议；'
          $("body").html(html)
          $('.pro-txt').html(proHtml)  

          if(data.data.isShow){
            $("[protocol]").show()
          }
          if(data.data.closeShow){
            $('[close]').show()
          }
          $('[close]').on('click',function(){
            $("[protocol]").hide()
          })

          $('[protocolbtn]').on('click',function(){
            jsonp('/message/shar',{},{
              success: function(data){
                console.log(data)
                if(data.success){
                  $(".ym-toast").html('服务升级成功!')
                }else{
                  $(".ym-toast").html('网络异常，请稍后重试!')
                }
                $(".ym-toast").show()
                setTimeout(function(){
                  $(".ym-toast").hide()
                  if(data.success){
                    window.location.reload()
                  }else {
                    void null
                  }
                  $("[protocol]").hide()
                },3000)
              },
              fail: function(e){
                $(".ym-toast").html('网络异常，请稍后重试!')
                $(".ym-toast").show()
                setTimeout(function(){
                  $(".ym-toast").hide()
                  $("[protocol]").hide()
                },3000)
              }
            })
          })
        }
      },
      fail: function(e){
        // console.log(e)
      }
    })
  }();

  function jsonp(url,param,options){
    STATE_CALLBACK = {
      uid: new Date - 0
    }
    if (!url) {
      throw new Error("参数不合法");
    }
    options.callbackName = options.callbackName || 'jsonpCallback'
    // 创建script标签并插入到页面中
    var script = document.createElement('script')
    script.setAttribute('async','async')
    var name = ['ymwangel',STATE_CALLBACK.uid++].join('')
    param[options.callbackName] = ['STATE_CALLBACK.',name].join('')
    //script的src赋值，赋值了就会请求
    script.src = paramConcatUrl(url,param)
    document.body.appendChild(script)

    //创建jsonp回调函数
    STATE_CALLBACK[name] = function(data){
      delete STATE_CALLBACK[name]
      document.body.removeChild(script)
      options.success && options.success(data);
      // resolve(data)

    }
    script.onerror = function(e){
      // reject(e)
      options.fail && options.fail(e);
    }
  }

  function paramConcatUrl(originurl,params){
    var urls = originurl.split('#')
    var url = urls[0]
    var rep = url.indexOf('?') == -1 ? '?' : '&'
    var pairs = []
    for(var key in params){
      if(params[key] != null){
        pairs.push(key+'='+encodeURIComponent(params[key]))
      }else{
        void null
      }
    }
    if(pairs.length == 0){
      return tourl(url)
    }else{
      return tourl(url + rep + pairs.join('&'))
    }
    function tourl(url){
      if(urls.length>1){
        return url + '#' + urls.slice(1).join('#')
      }else{
        return url
      }
    }
  }
});
