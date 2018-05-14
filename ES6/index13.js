/**
用模块封装代码
模块（Modules）与脚本（script）区别：
1.模块代码自动运行在严格模式下，并且没有任何办法跳出严格模式
2.在模块的顶级作用域创建的变量，不会被自动添加到共享的全局作用域，它们只会在模块顶级作用域的内部存在
3.模块顶级作用域的this值为undefined
4.模块不允许在代码中使用HTML风格的注释
5.对于需要让模块外部代码访问的内容，模块必须导出它们
6.允许模块从其他模块倒入绑定
例如：导出：export；
导入：import
*/

export var color="red"
export class Rectangle {
  constructor(length,width) {
    this.length = length
    this.width = width
  }
}
export function sum(a,b) {
   return a + b
}
function multiply(a,b) {
  return a * b
}
export {multiply}

/**
模块的默认值
1.模块的默认值（default value）是使用default关键字所指定的单个变量、函数或类，而在每个模块中只能设置一个默认导出

由于模块必须用与脚本不同 的方式运行，浏览器就引入了 <script type="module">以表示资源文件或内联代码需要作为模块来执行。
使用 <script type="module"> 加载的模块文件会默认应用defer属性。一旦包含模块的页面文档完全被解析，模块就会按照它们在文档中的出现顺序依次执行。
*/

/**
浏览器模块说明符方案
1. 以 ／ 为起始，表示从根目录开始解析
2. 以 ./ 为起始，表示从当前目录开始解析
3. 以 ../ 为开始，表示从父级目录开始解析
4. URL格式
*/





















