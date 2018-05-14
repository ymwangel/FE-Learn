var operacontroller = {
  inputs: ['certificateInfo.controllerName', 'certificateInfo.controllerCertCode', 'certificateInfo.controllerCodeEndDate',
    'controllerCreditAuthUrl', 'controllerCertCodeUrl', 'certificateInfo.controllerSpouseName', 'certificateInfo.controllerSpouseCertCode',
    'controllerSpouseCertCodeUrl', 'controllerSpouseCreditAuthUrl'],
  hide: function () {
    //隐藏input所在的li元素，
    var inputs = this.inputs
    for (var i = 0, len = inputs.length; i < len ; i++) {
      var strname = inputs[i]
      var ele = $('input[name="' + strname + '"]')
      ele.attr('disabled', 'disabled')
      var parent = ele.parent()
      let tagName = parent[0].tagName.toLowerCase()
      while (tagName && tagName != 'li') {
        //找到父元素为li的元素
        paren¶t = parent.parent()
        tagName = parent[0].tagName
        if (tagName) {
          tagName = tagName.toLowerCase()
        }
        if (tagName == 'li') { break }
      }
      parent.hide()
    }
  },
  show: function () {
    //显示input所在的li元素
    var inputs = this.inputs
    for (var i = 0, len = inputs.length; i < len ; i++) {
      var strname = inputs[i]
      var ele = $('input[name="' + strname + '"]')
      ele.removeAttr('disabled')
      var parent = ele.parent()
      let tagName = parent[0].tagName.toLowerCase()
      while (tagName && tagName != 'li') {
        parent = parent.parent()
        tagName = parent[0].tagName
        if (tagName) {
          tagName = tagName.toLowerCase()
        }
        if (tagName == 'li') { break }
      }
      parent.show()
    }
  }
}
$(function () {

  //变量
  var $companyCardType = $('#companyCardType');
  var $attchCompanyCardType = $('.j-attch-companyCardType');
  var $form = $('form');
  //是否已婚
  var $isMarried = $('input[name="certificateInfo.principalMarried"]');
  var $attachMarried = $('.attach-married');
  //是否国企
  var $isStateOwned = $('input[name="certificateInfo.stateOwnEnterprise"]');
  var $attachStateOwned = $('.attach-stateOwned');
  var memberId = $("#memberId").val();
  //法人类型
  // 卖家实际控制人默认非选择, 信息隐藏
  var $ptype = $('.principalType');
  var $principalType = $('input[name="companyBasicInfo.principalType"]');
  var $controllerType = $('input[name="certificateInfo.controllerType"]');

  //准入操作历史
  var $historyTable = $("#operate-history-list")
  $.ajax({
    url: '/finance/operateHistory?_='+new Date(),
    type: 'POST',
    data: {},
    dataType: 'json',
    success: function (data) {
      var html = ""
      var list = data.data
      for(var i=0;i<list.length;i++){
        html += ['<tr>',
                  '<td class="w-150">'+list[i].createTime+'</td>',
                  '<td class="w-150">'+list[i].status+'</td>',
                  '<td class="w-150">'+list[i].operator+'</td>',
                '</tr>'].join('')
      }
      $historyTable.html(html)
    },
    error: function (data) {
      alert('网络出错,请稍后重试');
    },
    complete: function () {
    }
  });

  //初始化一些操作
  (function () {
    //初始化时间插件
    laydate.skin('molv');
    laydate({
      format: 'YYYY-MM-DD',
      elem: '#u-date-picker',//#u-date-picker
      $el: $('#u-date-picker'),
      event: 'focus',
      choose: function (data) {
        this.$el.trigger("validate");
      }
    });
    laydate({
      format: 'YYYY-MM-DD',
      elem: '#u-date-picker-dj',//#u-date-picker
      $el: $('#u-date-picker-dj'),
      event: 'focus',
      choose: function (data) {
        this.$el.trigger("validate");
      }
    });
    laydate({
      format: 'YYYY-MM-DD',
      elem: '#u-data-picker-cl',//#u-date-picker
      $el: $('#u-data-picker-cl'),
      event: 'focus',
      choose: function (data) {
        this.$el.trigger("validate");
      }
    });
    laydate({
      format: 'YYYY-MM-DD',
      elem: '#u-data-picker-yy',//#u-date-picker
      $el: $('#u-data-picker-yy'),
      event: 'focus',
      choose: function (data) {
        this.$el.trigger("validate");
      }
    });
    laydate({
      format: 'YYYY-MM-DD',
      elem: '#u-data-picker-yyend',//#u-date-picker
      $el: $('#u-data-picker-yyend'),
      event: 'focus',
      choose: function (data) {
        this.$el.trigger("validate");
      }
    });
    laydate({
      format: 'YYYY-MM-DD',
      elem: '#u-data-picker-dqr',//#u-date-picker
      $el: $('#u-data-picker-dqr'),
      event: 'focus',
      choose: function (data) {
        this.$el.trigger("validate");
      }
    });
    laydate({
      format: 'YYYY-MM-DD',
      elem: '#u-data-picker-cdqr',//#u-date-picker
      $el: $('#u-data-picker-cdqr'),
      event: 'focus',
      choose: function (data) {
        this.$el.trigger("validate");
      }
    });
    laydate({
      format: 'YYYY-MM-DD',
      elem: '#u-data-picker-code',//#u-date-picker
      $el: $('#u-data-picker-code'),
      event: 'focus',
      choose: function (data) {
        this.$el.trigger("validate");
      }
    });
    laydate({
      format: 'YYYY-MM-DD',
      elem: '#u-data-picker-cont',//#u-date-picker
      $el: $('#u-data-picker-cont'),
      event: 'focus',
      choose: function (data) {
        this.$el.trigger("validate");
      }
    });

    //国企
    if ($('input[name="certificateInfo.stateOwnEnterprise"]:checked').val() == '1') {
      $attachStateOwned.hide();
    }
    //法人是否已婚
    if ($('input[name="certificateInfo.principalMarried"]:checked').val() == '2') {
      $attachMarried.hide();
    }
    if ($('#companyCardType').val() == '1') {
      $attchCompanyCardType.show().last().hide();
      $('input[name="socialCreditCode"]').attr("isrequired", "false")
    } else {
      $attchCompanyCardType.hide().last().show();
      $('input[name="socialCreditCode"]').attr("isrequired", "true")
    }
  })();

  //监听企业证件类型
  $companyCardType.change(function () {
    if (this.value == 1) {
      $attchCompanyCardType.show().last().hide();
      $('input[name="socialCreditCode"]').attr("isrequired", "false")

    } else {
      $attchCompanyCardType.hide().last().show();
      $('.card-unity-area').html($companyCardType.find('option').eq(this.value - 1).text())
      $('input[name="socialCreditCode"]').attr("isrequired", "true")
    }
  });
  //监听法人是否已婚
  $isMarried.click(function () {
    if (this.checked) {
      if (this.value == 1) {
        $attachMarried.show();
        $('input[name="companyBasicInfo.spouseName"]').attr('data-rule', 'required');
        $('input[name="companyBasicInfo.spouseCertCode"]').attr('data-rule', 'required');
      } else {
        $attachMarried.hide();
      }
    }
  });


  //是否国企
  $isStateOwned.click(function () {
    if (this.checked) {
      if (this.value == 2) {
        $attachStateOwned.show();
      } else {
        $attachStateOwned.hide();
      }
    }
  });
  //卖家实际控制人
  $controllerType.click(function () {
    if (this.checked) {
      operacontroller.show()
    } else {
      operacontroller.hide()
    }
  })

  //   $controllerType.click(function () {
  //   if (this.checked) {
  //     //if (this.value == 2) {
  //     //$attachStateOwned.show();
  //
  //     $('#controllerId').find('input').each(function () {
  //       if($(this).attr('type')=='text'){
  //         $(this).attr('data-rule','required')
  //       }
  //       else if($(this).attr('type')=='file'){
  //         $(this).attr('data-rule','required(companyCardTypeRule);uploadRule')
  //       }
  //     })
  //     //$form.trigger("validate");
  //     //} else {
  //     //$attachStateOwned.hide();
  //     //}
  //   }
  // });
  $form.validator({
    showOk: true,
    ignore: ':hidden',
    rules: {
      companyCardTypeRule: function (el, param, field) {
        var val = $companyCardType.val();
        //console.log(val);
        var type = el.getAttribute('data-type');
        var self = this;
        var $next = $(el).next();
        // if (val == 1) {
        //   return type == 1
        // } else {
        //   return type == 2
        // }
        if ($next.val() != "") {
          return false;
        } else {
          return true
        }
      },
      fileRequirRule: function (el, param, field) {
        var type = el.getAttribute('data-upload');
        var self = this;
        var $next = $(el).next();
        console.log($next.val());
        console.log(el);
        if ($next.val() != "") {
          return false;
        } else {
          return true
        }
      },
      chooseRule: function (el, param, field) {
        //console.log(el)
        return $('input[name="' + el.name + '"]:checked').length > 0;
      },
      uploadRule: function (el, param, field) {
        return el.getAttribute('data-upload') > 0;
      },
      // 元素是否校验
      isreQuire: function (el, param, field) {
        var isrequire = el.getAttribute('isrequired')
        if (isrequire === 'false') {
          return false
        } else {
          return true
        }
      }
    },
    messages: {
      chooseRule: '此处不能为空',
      fileRequirRule:'此处不能为空',
      uploadRule: '文件上传失败'
    },
    valid: function () {
      debugger
      console.log('--------> submit');
      var self = this;
      self.holdSubmit();
      $.ajax({
        url: '/finance/apply/opencredit?permission_code=finance-apply-W',
        type: 'POST',
        dataType: 'json',
        data: {
          memberId: memberId,
          applyInfoId: $('#applyInfoId').val(),
          role: $('#role').val()
        },
        success: function (data) {
          if (data.flag === 'true') {
            alert('操作成功');
            window.location = data.url
          } else {
            alert(data.msg)
          }
        },
        error: function (data) {
          alert('网络出错,请稍后重试');
        },
        complete: function () {
          self.holdSubmit(false);
        }
      });
    }
  });

  //文件上传
  $('.j-uploader-img,.j-uploader-pack').change(function () {
    var self = this;
    var $next = $(self).next();
    //支持的文件
    var suffixs = ['jpg', 'jpeg', 'png', 'bmp'];
    //文件的大小
    var fileSizeLimit = 1024 * 1024 * 4;
    if (this.getAttribute('class').indexOf('j-uploader-pack') > -1) {
      suffixs = ['zip', 'rar'];
      fileSizeLimit = 1024 * 1024 * 10;
    }
    var f = this.files[0];
    var suf = f.name.substring(f.name.lastIndexOf('.') + 1).toLowerCase();
    if (suffixs.indexOf(suf) === -1) {
      self.setAttribute('data-upload', '0');
      return alert('文件格式不支持');
    }
    if (f.size > fileSizeLimit) {
      self.setAttribute('data-upload', '0');
      return alert('文件过大,请重新选择');
    }

    var formData = new FormData();
    var filename = $next.attr('name');
    formData.append(filename + 'File', f, f.name);
    formData.append("qualifiedType", filename);
    formData.append("memberId", memberId);
    $.ajax({
      url: '/finance/apply/upload?permission_code=finance-apply-W',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data) {
        self.setAttribute('data-upload', '1');
        var tag = "@_@";
        var url = "";
        if (data.indexOf(tag) != -1) {
          url = data.substring(data.indexOf(tag) + 3)
          $next.val(data);
          $next.next().attr('href', '/finance/apply/getOssFileUrl?permission_code=finance-apply-W&key=' + url).show();
        }


      },
      error: function (data) {
        self.setAttribute('data-upload', '0');
      }
    });

  });

  $('.g-footer button').click(function () {
    //1:返回,2:通过,3:驳回,4:保存,5,跟进
    var type = this.getAttribute('data-type');
    switch (type) {
      case '1' :
        window.location = '/finance/apply/buyerlist';
        break;
      case '2' :
        if (GLOBAL_CONFIG.submitBtn) {
          save(false)
          $form.trigger("validate");
        } else {
          alert('没权限');
        }
        break;
      case '3' :
        if (GLOBAL_CONFIG.rejectBtn) {
          reject();
        } else {
          alert('没权限');
        }
        break;
      case '4' :
        if (GLOBAL_CONFIG.saveBtn) {
          save(true);
        } else {
          alert('没权限');
        }
        break;
    }

  });

  function reject() {
    var remarks = $('textarea[name="companyTradeInfo.remark"]').val();
    if (remarks.length < 5) {
      return alert('驳回理由最少5个字');
    }
    $.ajax({
      url: '/finance/apply/reject?permission_code=finance-apply-W',
      type: 'POST',
      data: {
        remarks: remarks,
        applyInfoId: $('#applyInfoId').val(),
        role: $('#role').val()
      },
      // dataType: 'text',
      success: function (data) {
        alert('操作成功');
        window.location = data;
      },
      error: function (data) {
        alert('网络出错,请稍后重试');
      },
      complete: function () {
      }
    });
  }

  function save(e) {
    $.ajax({
      url: '/finance/apply/savedata?permission_code=finance-apply-W',
      type: 'POST',
      data: $form.serialize(),
      // dataType: 'text',
      success: function (data) {
        if (e) {
          alert('保存成功');
          window.location = data;
        }
      },
      error: function (data) {
        alert('网络出错,请稍后重试');
      },
      complete: function () {

      }
    });
  }
});
// 统一社会信用代码进行关联
// ①组织机构代码：57685465-8（左起9-17位）
// ②营业执照代码： 91110116576854658E
// ③税务登记证代码：110116576854658（左起3-17位）
function linkcreditCode () {
  $('input[name="companyBasicInfo.socialCreditCode"]').on('blur', function (e) {
    var val = $(this).val()
    val = $.trim(val)
    if (val.length == 18) {
      var organCode = val.substring(8, 16) + '-' + val[16]
      $('input[name="companyBasicInfo.organCode"]').val(organCode)
      $('input[name="companyBasicInfo.regCode"]').val(val)
      $('input[name="companyBasicInfo.taxRegCode"]').val(val.substring(2, 17))
    }
  })
}


// 卖家实际控制人默认非选择, 信息隐藏
$(document).ready(function () {
  linkcreditCode()
  operacontroller.hide()
})