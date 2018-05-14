function find(arr,num){
  if(num==null || num == ''){
    console.log(num+" is null")
    return
  }
  while(num!=undefined&&arr.length){
    var temp = arr[arr.length-1][0]
    if(num == temp){
        console.log(num+"is finded")
        return temp
    }else if(temp>num){
        arr.pop()
        if(arr.length == 1){
            console.log(num + " is not exists,"+num+" is less the minValue")
            return
        }
    }else{
        for(var i=0;i<arr.length;i++){
            if(arr[i].length ==1){
                console.log(num + " is not exists,"+num+" is more than the maxValue")
                return
            }
            arr[i].shift()
        }
    }
  }
}

var arr = [[1,2,4,6],[2,4,7,8],[8,9,10,11],[9,12,13,15]];
var result = find(arr,null)
console.log(arr)