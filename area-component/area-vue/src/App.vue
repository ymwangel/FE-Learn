<template>
  <div class="ym-area" name="ym-area">

    <!-- input的change事件：在input失去焦点时触发 -->
    <!-- input的input事件，在input输入框的值改变的时候触发,但是，如果定义了blur事件，在失去焦点的时候，blur事件会覆盖掉change事件 -->
    <input style="display:block;height:32px;border:1px solid blue" type="text" @input="inputTest()" @change="changeInputTest()" v-model="inputValue" @blur="blurInputTest()" @click="clickInputTest()">
    

    <div class="mod-input">
      <label class="label">收货地址：</label>
      <div class="input-box">
        <input 
        class="input" 
        type="text" 
        placeholder="请选择收货地址" 
        :value="areaVal"
        @click="clickInput" 
        :class="isShow ? 't' : ''"
        @blur="blur()"
        >
        <img class="arrow-icon" :class="isShow ? 'arrowActive' : ''" src="../img/arrow-down-icon.png" alt="">
        <div class="mod-con" v-if="isShow"
           @mousedown="inputDown($event)"
           @mouseup="inputUp($event)">
          <ul class="con-title">
            <li @click="renderProvince()" :class="currentType == 'province' ? 't' : ''">省</li>
            <li @click="renderCity()" :class="currentType == 'city' ? 't' : ''">市</li>
            <li @click="renderRegion()" :class="currentType == 'region' ? 't' : ''">区</li>
          </ul>
          <ul class="con-lists" ref="conList" v-show="listData.length>0">
            <li v-for="item in listData" 
              @click="chooseVal(item.name)" 
              :key="item.id" 
              :class="province === item.name || city === item.name || region === item.name ? 'active' : ''">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  function data() {
    return {
      isShow: false,
      areaVal: '',
      province:'',
      city:'',
      region:'',
      list: [],
      listData: [],
      currentType:'province',
      inputValue:''
    }
  }
  let methods = {
    blur(){
      console.log('blur input')
      this.isShow = false
    },
    input(){
      console.log('focus input')
    },
    clickInput(event){
      console.log('click input')
      this.isShow = !this.isShow
    },
    inputDown(event){
      console.log('mousedown')
      event.preventDefault()
    },
    inputUp(event){
      console.log("mouseup")
    },
    chooseVal(value){
      var vm = this
      vm[vm.currentType] = value
      if(vm.currentType == 'province'){
        vm.renderCity()
      }else if(vm.currentType == 'city'){
        vm.renderRegion()
      }else{
        vm.areaVal = [vm.province, vm.city, vm.region].join('/')
        vm.isShow = false
        return 
      }
    },
    renderProvince(){
      var vm = this
      vm.currentType = 'province'
      renderProvince(vm)
    },
    renderCity(){
      var vm = this
      if(vm.province === ''){
        return
      }
      vm.currentType = 'city'

      vm.listData = filter(function(item){
        return item.name == vm.province ? item : null
      },vm.list)[0].list
    },
    renderRegion(){
      var vm = this
      if(vm.province === '' || vm.city === ''){
        return
      }
      if(isCityInProvince(vm).length === 0){
        return
      }
      vm.currentType = 'region'

      vm.listData = filter(function(item){
        return item.name == vm.city ? item : null
      },vm.listData)[0].list
    },
    inputTest() {
      console.log('input test')
      console.log(this.inputValue)
    },
    changeInputTest(){
      console.log('change input test')
      // console.log(this.inputValue)
    },
    blurInputTest(){
      console.log('blur input test')
    },
    clickInputTest(){
      console.log('click input test')
    }
  }

  function renderProvince(vm){
    var xs = vm.list
    var r = []
    for(let i=0; i < xs.length; i++ ){
       r.push({"name":xs[i].name})
    }
    vm.listData = r
  }

  function isCityInProvince(vm){
    return filter(item => {
      if(vm.city == item.name){
        return true
      }
    },vm.listData)
  }

  function filter(fn, xs) {
    var r = []
    for(var i=0 ; i<xs.length; i++) {
      if(fn(xs[i])){
        r.push(xs[i])
      }
    }
    return r
  }

  export default {
    data,
    methods,
    mounted: function(){
      var vm = this
      vm.list = STATE_AREA.list
      renderProvince(vm)
    },
    watch:{
      // 'province' : function(newVal, old){
      //   console.log(newVal)
      //   console.log(old)
      //   var vm = this
      //   if(newVal !== ''){
      //     vm.renderCity()
      //   }
      // },
      // 'city' : function( newVal, old ) {
      //   var vm = this
      //   if(newVal !== ''){
      //     vm.renderRegion()
      //   }
      // }
    }
  }
</script>