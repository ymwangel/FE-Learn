'use strict';
function cbAfter3s(callback) {
    setTimeout(function(){
        try {
            callback(null, '3s')
        }catch (e) {
            console.log('Catch in cbAfter3s', e)
            callback(new Error('Error from cbAfter3s'))
        }
        throw new Error('Error from cbAfter3s ASync')
    },3e3)
    throw new Error('Error from cbAfter3s Sync')
}

function handle(err,data) {
    console.info('Reveive: ', err,data)
    if(!err){
        throw new Error('Error from handle')
    }
}

try {
    cbAfter3s(handle)
}catch (e) {
    console.log('Catch in global', e)
}

process.on('uncaughtException', function(e){
    console.error('Catch in process',e)
})


// 总结：
// 1。 try/catch 只能捕获同步抛出的错误
// 2。 不要轻易在 callback 里 throw 错误，不然容易形成两次回调
// 3。 代码未捕获的错误，会出现在 uncaughtException 事件上，建议做些日志记录。不然，加入你用了进程守护程序（如pm2等），会自动重启应用，进而湮没日志。
// 4。 promise 的错误捕获又是不同的，不能想当然