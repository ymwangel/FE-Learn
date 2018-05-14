(function(){
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
  var myDB={
      name:'test',
      version:3,
      db:null
  };
  openDB(myDB.name,myDB.version);
  var s=[
  { 
      id:1001, 
      name:"Byron", 
      age:24 
  },
  { 
      id:1002, 
      name:"Frank", 
      age:30 
  },
  { 
      id:1003, 
      name:"Aaron", 
      age:26 
  }];

  function openDB(name,version){
    var version = version || 1
    var request = window.indexedDB.open(name,version)
    request.onerror = function(event){
      console.log(event.currentTarget.error.message)
    }
    request.onsuccess = function(event){
      myDB.db = event.target.result
    }
    request.onupgradeneeded = function(event){
      var db = event.target.result
      if(!db.objectStoreNames.contains('s')){
        db.createObjectStore('s',{keyPath:"id"})
      }
      console.log('DB version changed to ' + version)
    }

  }
  function addData(db,storeName){
    var transaction = db.transaction(storeName,'readwrite')
    var store = transaction.objectStore(storeName)  //获取名字为storeName的数据仓库（可以理解为表）
    for(var i=0;i<s.lenth;i++){
      store.add(s[i])
    }
    store.onsuccess = function(e){
      console.log('success')
    }
  }
  openDB(myDB.name,myDB.version)
  setTimeout(function(){
    addData(myDB.db,'s')
  },1000)

})()
