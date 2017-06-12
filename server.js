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

//static中的/Users/wuage/work-git/FE-Learn为项目的全路径，use的第一个参数可以不写，然后访问：http://127.0.0.1:7666/pages/src/view/index.html就可以了
app.use(express.static('/Users/wuage/work-git/FE-Learn'))
app.listen(7666,function (err) {
	if(err){
		console.log(err);
		return
	}
	console.log("Listening at http://127.0.0.1:7666");
})
