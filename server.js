// var express = require('express')
// const app = express()
// // app.use('/inner',express.static("/Users/diqye/workspace/front/style-inner"));
// app.use('/spider',express.static('/Users/diqye/workspace/front/style-spider'))

// app.listen(7766, function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Listening at http://127.0.0.1:8080');
// });

var express = require('express')
const app = express()

// app.use("/FE-Learn",express.static('/Users/macbook/work-git/FE-Learn'))
app.listen(6060,function (err) {
	if(err){
		console.log(err);
		return
	}
	console.log("Listening at http://127.0.0.1:6060");
})
