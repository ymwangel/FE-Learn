function nothing(){
  return false
}
function just(obj){
  obj.state[obj.name] = null
  return true
}
function error(msg){
  return function(obj){
    obj.state[obj.name] = msg
    return false
  }
}
 
function formValidates(vm,vs){
  let result = true
  let firstError = null
  for(let i=0;i<vs.length;i++){
    if(_fn(vs[i])){
      continue
    }else{
      result = false
      firstError = firstError || vs[i]
    }
  }

  function _fn(item){
    let value = vm.invoiceDialog[item]
    if(value && value.trim{
      value = value.trim()
    }else{
      void null
    }
    return v.item(validateForm[item],{
      type:'multiple',
      value:value,
      name:item,
      state:vm.invoiceDialog.rules
    })
  }
  return {
    result :result,
    firstError:firstError
  }

}































