import F from '../lib/function.js'

function getInfo () {
  return new Promise(function (resolve,reject) {
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/punish/acquire/drop_down/data',
      success:function (data) {
        if(!data.success){
          alert("加载信息失败，请稍后重试!")
        }
        resolve(data.data)
      }
    })
  })
}

export default {
  getInfo
}
