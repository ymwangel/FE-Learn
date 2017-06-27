(function(){
	var currentTime = new Date()-0
	var date = new Date()
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()
	var time = year + "/" + month + "/" + day
	var secondNUm = Date.parse(time)
	console.log(secondNUm)
	var startTime = secondNUm + 7*24*60*60*1000
	var endTime = secondNUm + 8*24*60*60*1000
	if(startTime <= currentTime <= endTime){
		// localStorage.setItem("time",currentTime)
		// 然后显示弹框
	}
})()