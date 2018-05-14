<template>
  <div>
    <wcity class="city city-overflow"
      :class="{'red-bd': !receiveAddr}"
      v-model="receiveAddr"
      placeholder="请选择收货地址"
      :slRange="3"></wcity>
  </div>
</template>

<script>
  import wcity from './WCity.vue'
  function noop () {}
  export default {
    data () {
      return {
        receiveAddr: ''
      }
    },
    components: {'wcity': wcity}
  }
</script>

<style scoped>
  .mod-wcity{
    display: inline-block;
    position: relative;
    /* cursor: pointer; */
  }
  .mod-wcity .hide{
    display: none;
  }
  .mod-wcity .input-box{
    height: 32px;
    font-size: 12px;
    padding: 7px 12px;
    border: #bfcbd9 1px solid;
    line-height: 1.5;
    box-sizing: border-box;
    min-width: 282px;
    border-radius: 4px;
    color:#353535;
    position: relative;
    background: #fff;
  }
  .mod-wcity.t .input-box{
    z-index: 2;

  }
  .mod-wcity .input-box.placeholder{
    color:#8391a5;
  }
  .mod-wcity i.arrow{
    display: block;
    position: absolute;
    background: url('../i/down.png');
    background-size: 16px;
    height: 16px;
    width: 16px;
    right: 9px;
    top: 7px;
  }
  .mod-wcity.t i.arrow{
    z-index: 2;
  }
  .mod-wcity.t i.arrow{
    background: url('../i/arrow-up.png');
    background-size: 16px;
  }
  .mod-wcity .city-content{
    display: none;
    background: #fff;
    width: 100%;
    position: absolute;
    top: 32px;
    left: 0px;
    box-shadow: 0 0 16px 0 #C5C5C5;
    overflow: hidden;
  }
  .mod-wcity.t .city-content{
    z-index: 20;
    display: block;
  }
  .mod-wcity .city-header{
    font-size: 0px;
    margin: 0px;
    padding: 0px;
    background: #F5F5F5;
    border-bottom: 1px solid #E5E5E5;
  }
  .mod-wcity .city-header>li{
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    border-right: 1px solid #E5E5E5;
    line-height: 30px;
    background: #F5F5F5;
  }
  .mod-wcity .city-header>li.bisect{
    width: 50%
  }
  .mod-wcity .city-header>li.trisect{
    width: 33.33%
  }
  .mod-wcity .city-header>li.f{
    width: 25%
  }
  .mod-wcity .city-header>li.t{
    background: #fff;
  }
  .mod-wcity .city-header>li:last-child{
    border-right: none;
  }
  .mod-wcity .city-loading{
    text-align: center;
  }
  .mod-wcity .city-loading .loading-cnt{
    margin-top: 33px;
    font-family: PingFangSC-Regular;
  }
  .mod-wcity .loading-cnt .reload{
    margin-bottom: 40px;
    font-size: 14px;
    line-height: 16px;
  }
  .mod-wcity .city-loading .icon{
    width: 16px;
    height: 16px;
    vertical-align: text-top;
    overflow: hidden;
    box-sizing: border-box;
  }
  .icon.icon-warn {
    fill: #FF7300;
    background: #FFFFFF;
  }
  .icon-loading{
    display: inline-block;
    background: url('../i/loading.png') center center no-repeat;
    background-size: 100% 100%;
    animation: hrd-loading 800ms infinite linear;
  }
  @keyframes hrd-loading{
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  .mod-wcity .btn-op{
    color: #316CCB;
  }
  .mod-wcity .btn-op:hover{
    color: #407FE7;
  }
  .mod-wcity .btn-op.clear{
    height: 28px;
    line-height: 28px;
    margin: 19px auto 2px;
    font-size: 12px;
    text-align: center;
  }
  .mod-wcity .btn-op.clear.disable{
    color: #959595;
    cursor: not-allowed;
  }
  /* 
    todo 无点击时，hover清空，颜色变化
  */
  /* .mod-wcity .btn-op.clear.disable:hover{
    color: #407FE7;
  } */
  .mod-wcity .city-loading span{
    display: inline-block;
    height: 16px;
    line-height: 16px;
    margin-left: 16px;
    font-size: 14px;
    color: #353535;
    vertical-align: text-top;
  }
  .mod-wcity .city-loaded .loaded-ops{
    text-align: center;
    margin: 0px;
  }
  .mod-wcity .city-cnt{
    padding: 16px 0 16px 9px;
  }
  .mod-wcity .city-middle{
    display: block;
    background: #fff;
    /* padding: 16px 24px; */
    padding: 0px;
    color: #656565;
    font-size: 0px;
    /* width: calc(100% + 30px); */
  }
  .mod-wcity .city-middle>li{
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    /* width: 66px; */
    width: 36px;
    margin-right: 15px;
    margin-left: 15px;
    line-height: 28px;
    overflow: hidden;
  }
  .mod-wcity .city-middle>li.margin-rt-none{
    /* margin-right: 0px; */
  }
  .mod-wcity .city-middle>li:hover{
    color:#316ccb;
  }
  .mod-wcity .city-middle>li.selected{
    color: #316ccb;
  }
  .mod-wcity .pointer:hover{
    cursor: pointer;
  }
  .mod-wcity .default:hover{
    cursor: default;
  }
</style>
