(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('ju', ['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    root.ju = factory(root.jquery);
  }
})(this, function () {
  STATE_CALLBACK = {
    uid:new Date - 0
  }
  var dialog = function (options) {
    var defaults = {
      message: '默认内容',
      title: '提示',
      closeable: true,
      closeTpl: '×',
      cls: 'yug-mod-dialog',
      width: 400,
      height: undefined,
      showHead: true,
      showFoot: true,
      showCancel: false,
      showConfirm: true,
      confirmBtnText: '确定',
      cancelBtnText: '取消',
      confirmBtnClass: 'confirm',
      cancelBtnClass: 'cancel',
      onConfirm: function () {
      },
      onCancel: function () {
      }
    };
    var opts = $.extend({}, defaults, options);

    var head = (function () {
      if (!opts.showHead) {
          return '';
      }
      return '<div class="part-head">' +
          '<h2>' + opts.title + '</h2>' +
          '</div>';
    })();

    var body = '<div class="part-body">' + opts.message + '</div>';

    var foot = (function () {
      if (!opts.showFoot) {
          return '';
      }
      var footHtml = '';
      if (opts.showConfirm) {
          footHtml += '<a target="_self" href="javascript:void(0);" class="btn" datatype="confirm">' + opts.confirmBtnText + '</a>';
      }
      if (opts.showCancel) {
          footHtml += '<a target="_self" href="javascript:void(0);" class="close btn" datatype="cancel">' + opts.cancelBtnText + '</a>';
      }
      return '<div class="part-foot">' + footHtml + '</div>';
    })()
    var box = $('<div class="' + opts.cls + '"><div class="model-panel"><a target="_self" href="javascript:void(0);" class="icon icon-close" datatype="close"></a></div></div>');
    box.find('.model-panel').append(head + body + foot);
    $('body').append(box);
    box.click(function (ev) {
      var dataType = $(ev.target).attr("datatype");
      if (dataType == 'close') {
          box.remove();
      } else if (dataType == 'cancel') {
          opts.onCancel();
      } else if (dataType == 'confirm') {
          opts.onConfirm();
      } else {
          return false;
      }
      box.remove();
    })
    return box;
}
return function (ele) {
    $.ajax({
      url: '//login.wuage.com/getLoginInfo',
      dataType: 'jsonp',
      jsonp: "jsonpCallback",
      success: function (data) {
        console.log(data.logined);
        if (data.logined == 'N') {
          dialog({
            message: '<p class="login-tip">' +
            '你还没有登录！' +
            '</p>' +
            '<p class="body-call"><a target="_self" class="login-btn" href="javascript:void(0);">登录</a></p>' +
            '<p><img src="//img.wuage.com/1458803009362631688-logo.jpg" />1688会员登录</p>' +
            '<p class="regist-tip">' +
            '没有账号？去<a target="_self" class="regist-link" href="javascript:void(0);">注册</a>' +
            '</p>',
            cls: 'yug-mod-dialog yug-dialog-login',
            showHead: false,
            showFoot: false
          });
          var loginBtn = $('.yug-mod-dialog .login-btn');
          var registLink = $('.yug-mod-dialog .regist-link');
          loginBtn.click(function (event) {
            location.href = '//login.wuage.com/loginPage?url=' + encodeURIComponent(location.href);
          });
          registLink.click(function (event) {
            location.href = "//login.wuage.com/register";
          });
          return false;

        }else if(data.logined == 'Y'){
          var banId=$(ele).parents('.mod-reserve').find('.banId').html();
          location.href = "//buyer.wuage.com/front/futures/querydetail?code="+banId;

        }
      },
      error: function () {
        // alert('fail');
      }
    });
  };
});