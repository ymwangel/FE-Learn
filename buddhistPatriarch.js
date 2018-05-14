let styles=[
  ["color:#CC0066"]
  ,["color:#CC9966"]
  ,["color:#FF99FF"]
  ,["color:#006600"]
  ,["color:#0099CC"]
  ,["color:#330066"]
  ,["color:#333300"]
  ,["color:#336633"]
  ,["color:#999900"]

].map(a=> 'font-size:3em;' + a)
function dlog(str,styles){
  let stylestr = '%c' + str.split('').join('%c')
  let a = new Array(parseInt(str.length))
  .fill('')
  .map(_=>styles[parseInt(Math.random() * styles.length)])
  console.log.apply(console,[stylestr,...a])
}

dlog(String.raw `                  
                    _ooOoo_ 
                   o8888888o 
                   88" . "88 
                   (| -_- |) 
                   O\  =  /O 
                ____/.---'\____ 
              .'  \\|     |//  '. 
             /  \\|||  :  |||//  \ 
            /  _||||| -:- |||||-  \ 
            |   | \\\  -  /// |   | 
            | \_|  ''\---/''  |   | 
            \  .-\__  '-'  ___/-. / 
         ___'. .'  /--.--\  '. . __ 
       ."" '<  '.___\_<|>_/___.'  >'"". 
      | | :  '- \`.;'\ _ /';.'/ - ' : | | 
      \  \ '-.   \_ __\ /__ _/   .-' /  / 
 ======'-.____'-.___\_____/___.-'____.-'====== 
                    '=---=' 
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
          本代码已经过佛祖开光`,styles)


