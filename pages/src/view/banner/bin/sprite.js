// author qzl 本工具只作为辅助性生成css，并不具有依赖性

var css = require('css')
var fs = require('fs')
var spritesmith = require('spritesmith');
var _ = require('ramda')


function parserUrl(token){
  var r = /url\(([^\)]+)\)/.exec(token)
  if(r!=null&&r[1]!=null){
    return r[1]
  }else{
    return null
  }
}
function getBackgroundURL(xs){
  var item = _.find(function(x){
    if(x.property == 'background'){
      return true
    }else{
      if(x.type == 'comment'){
        return x.comment.indexOf('diqye@') != -1
      }else{
        return false
      }
    }
  },xs)
  if(item == null){
    return null
  }else if(item.type == 'comment'){
    return parserUrl(item.comment)
  }else{
    return parserUrl(item.value)
  }

}
function contains(str,xs){
  return _.all(function(a){
    return a.indexOf(str) != -1
  })(xs)
}
function findDIcon(xs){
  return _.find(function(item){
    return item.selectors&&item.selectors[0] == '.d-icon'
  },xs)
}

function findIcons(xs){
  return _.filter(function(item){
    return item.selectors == null                  ? false
    : item.selectors[0] == '.d-icon'               ? false
    : contains('.d-icon',item.selectors) == false  ? false
    : getBackgroundURL(item.declarations) == null  ? false
    : true

  },xs)
}
function parserObj(icons){
  var r = {
    paths:[]
  }
  for(var i=0;i<icons.length;i++){
    var key = getBackgroundURL(icons[i].declarations)
    if(r[key]&&r[key].length){
      r[key].push(icons[i])
    }else{
      r[key] = [icons[i]]
    }
    r.paths.push(key)
  }
  r.paths = _.uniq(r.paths)
  return r
}
function topx(n){
  return (n/2) + 'px'
}
function setSprite(path,imginfo,rule){
  var background = _.find(_.propEq('property','background'),rule.declarations)
  if(background){
    background.value = 'url('+path+') no-repeat'
  }else{
    rule.declarations.push({
      type:'declaration',
      property:'background',
      value:'url('+path+') no-repeat'
    })
  }
  
  var backgroundSize = _.find(_.propEq('property','background-size'),rule.declarations)
  if(backgroundSize){
    backgroundSize.value = topx(imginfo.width)
  }else{
    rule.declarations.push({
      type:'declaration',
      property:'background-size',
      value:topx(imginfo.width)
    })
  }
  
}
function setIcon(icon,info){
  var backgroundItem = _.find(_.propEq('property','background'),icon.declarations)
  icon.declarations = _.filter(_.complement(_.propEq('property','background')),icon.declarations)  
  if(backgroundItem){
    icon.declarations = _.prepend({
      type:'comment',
      comment:'diqye@' + backgroundItem.value
    },icon.declarations)
  }else{
    void null
  }
  var width = _.find(_.propEq('property','width'),icon.declarations)
  if(width){
    width.value = topx(info.width)
  }else{
    icon.declarations.push({
      type:'declaration',
      property:'width',
      value:topx(info.width)
    })
  }
  var height = _.find(_.propEq('property','height'),icon.declarations)
  if(height){
    height.value = topx(info.height)
  }else{
    icon.declarations.push({
      type:'declaration',
      property:'height',
      value:topx(info.height)
    })
  }
  var position = _.find(_.propEq('property','background-position'),icon.declarations)
  if(position){
    position.value = topx(0-info.x) + ' ' + topx(0-info.y)
  }else{
    icon.declarations.push({
      type:'declaration',
      property:'background-position',
      value:topx(0-info.x) + ' ' + topx(0-info.y)
    })
  }
}
function handlerCss(cssTokens,fn){
  var dicon = findDIcon(cssTokens)
  var icons = findIcons(cssTokens)
  var iconObj = parserObj(icons)
  spritesmith.run({
    padding:2,
    src:iconObj.paths
    // algorithm:'top-down'
  },function(err,result){
    if(err){
      console.log(err)
    }else{
      fs.writeFileSync('../i/sprite.png',result.image)
      setSprite('../i/sprite.png',result.properties,dicon)
      for(var key in result.coordinates){
        var c = result.coordinates[key]
        var icons = iconObj[key]
        _.forEach(function(icon){
          setIcon(icon,c)
        },icons)
        fn()
      }
    }
  })

}

function main(){
  var cssstring = fs.readFileSync('../css/index.css').toString()
  var obj = css.parse(cssstring, {})
  var sheet = obj.stylesheet
  if(sheet.parsingErrors.length == 0){
    handlerCss(sheet.rules,function(){
      var cssstr = css.stringify(obj, {})
      fs.writeFileSync('../css/index.css',cssstr)
    })
    
  }else{
    console.log(sheet.parsingErrors)
  }
}
main()
