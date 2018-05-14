// CamelCase Method --6kyu
String.prototype.camelCase=function(){
  return this.trim().split(' ').map(a=>a.slice(0,1).toUpperCase()+a.slice(1)).join('')
}
console.log("test case".camelCase())