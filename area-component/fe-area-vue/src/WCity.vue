<template>
  <!-- @click.stop阻止冒泡事件的发生 -->
  <div :class="['mod-wcity',sT ? 't' : '']" @click.stop>
    <!-- <input type="text" :name="name" class="hide" :value="value" > -->
    <div class="input-box pointer" v-if="value" @click="toogleST">
      {{ value }}
    </div>
    <div class="input-box placeholder pointer" v-else @click="toogleST">
      {{ placeholder }}
    </div>
    <i class="arrow" @click="toogleST"></i>
    <div class="city-content">
      <ul class="city-header pointer">
        <li v-for="(r, idx) in Math.min(slRange, 3)" :class="[slRange === 3 ? 'trisect' : slRange === 2 ? 'bisect' : slRange === 4 ? 'trisect' : '', cST == r ? 't' : '', hasStreet ? 'f' : '']" @click="handleCityHeaderClick(r)">{{hdLabel[idx]}}</li>
        <li v-if="hasStreet" :class="[cST == 4 ? 't' : '', hasStreet ? 'f' : '']" @click="handleCityHeaderClick(4)">{{levelForthLabel}}</li>
      </ul>
      <div class="city-cnt">
        <div class="city-loading default" v-if="!controller.dataLoaded">
          <p v-if="controller.dataLoading">
            <i class="icon icon-loading"></i>
            <span>数据加载中</span>
          </p>
          <div class="loading-cnt" v-if="controller.dataError">
            <svg aria-hidden="true" class="icon icon-warn">
              <use xlink:href="#fe-icon-warn"></use>
            </svg>
            <span>数据加载失败!</span>
            <p class="btn-op reload pointer" @click="reloadHandler">重新加载</p>
          </div>
        </div>
        <div class="city-loaded" v-else>
          <ul class="city-middle">
            <li v-for="(item, index) in itemsR" @click="handleItemClick(item)" :class="['pointer', { 'margin-rt-none': (index+1)%4 === 0 }, { 'selected': checkIsSelected(item) }]" :title="item.abbreviated">{{ (item.abbreviated || item.name) | limit(3)}}</li>
          </ul>
          <p class="loaded-ops" v-if="clearable">
            <span class="btn-op clear pointer" :class="{'disable': !hasClick}" @click="clearAll">清空</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { queryAreaJSONP } from '../apis'
  import { isEmptyObject, copyList } from '../util'
  function noop () {}
  export default {
    name: 'wcity',
    props: {
      // 1 代表返回 'xx' 2 代表返回 'xx省' 市同理 区别在于后端是否返回'省/市后缀'
      type: {
        type: Number,
        default: 1
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      name: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        dafault: ''
      },
      slRange: {
        type: Number,
        default: 3
      },
      hdLabel: {
        type: Array,
        default: () => {
          return ['省', '市', '区']
        }
      },
      clearable: {
        type: Boolean,
        default: false
      },
      levelFourth: {
        type: Array,
        default: () => {
          return [
            // {
            //   // parentCode: 4531,
            //   parentName: '广东佛山顺德区',
            //   headerLabel: '街道',
            //   data: [
            //     {
            //       name: '佛山市顺德区伦教镇',
            //       // code: 2676,
            //       abbreviated: '伦教镇'
            //     },
            //     {
            //       name: '佛山市顺德区乐从镇',
            //       // code: 2677,
            //       abbreviated: '乐从镇'
            //     }
            //   ]
            // }
          ]
        }
      }
    },
    data () {
      return {
        sT: false, // 控制区域显示与否
        cST: 1, // 1省 2市 3区
        provinces: [], // 省份列表
        citys: [], // 城市列表
        areas: [], // 区列表
        provincesCache: {},
        citysCache: {}, // 城市数据缓存
        areasCache: {}, // 区数据缓存
        // 已选择的 省/市/区/第四级
        selected: {
          province: {},
          city: {},
          area: {},
          street: {}
        },
        levelForthLabel: '街道', // 第四级头部名称
        levelForthData: [], // 第四级数据列表
        // 控制第四级显示隐藏，点击第三级数据时改变
        // 当props中的levelFourth中有和点击的第三级数据匹配的元素时hasStreet值为true
        hasStreet: false,
        // 状态控制
        controller: {
          // 数据已经加载
          dataLoaded: false,
          // 数据加载中
          dataLoading: true,
          // 数据加载异常
          dataError: false
        },
        lastQueryCode: -1,
        selectedCodeList: ['-1'],
        selectedCodeListBack: ['-1'],
        selectedFourth: '',
        selectedFourthBack: '',
        // 如果回显，是否回显完成
        echoFlag: false,
        // 判断用户是否进行了操作
        userHasClick: false
      }
    },

    computed: {
      cSTValid () {
        let cST = this.cST
        return cST >= 1 && cST <= 4
      },
      // 用于判断用户是否点击过某项数据
      // 在created钩子中请求了省级数据
      // 所以点击任意一项省级数据，必然会请求市级数据，市级数据必然长度大于0
      // todo
      hasClick () {
        return this.citys.length
      },
      itemsR () {
        let cST = this.cST
        if (cST === 1) {
          return this.provinces
        } else if (cST === 2) {
          if (!this.citys.length) this.setControllerStatus(1)
          return this.citys
        } else if (cST === 3) {
          if (!this.areas.length) this.setControllerStatus(1)
          return this.areas
        } else {
          return this.levelForthData
        }
      }
    },

    watch: {
      value (newVal, oldVal) {
        if (!this.echoFlag && !this.userHasClick && !oldVal && newVal) {
          // 如果在执行created生命周期之前监听到了变化
          // 则主动请求省份数据 然后通过initValue方法自动查询市级之后的数据
          if (!this.provinces.length) {
            this.queryPipeAsync({ level: 1, code: 0, loading: true }).then(() => {
              this.initValue()
            }).catch(err => {
              throw err
            })
          } else {
            console.log('s')
            this.initValue()
          }
        }
      }
    },

    filters: {
      limit (str, n) {
        return str ? str.slice(0, n) : str
      }
    },
    methods: {
      // 异步请求，用于回显
      queryPipeAsync ({ level, code, cb, loading }) {
        let queryCode = code
        this.lastQueryCode = queryCode
        return queryAreaJSONP(this.type, level, queryCode).then(({ code, data }) => {
          let parsedData = this.parseData(data)
          level === 1 ? ((this.provinces = parsedData) & (this.provincesCache = parsedData))
          : level === 2 ? ((this.citys = parsedData) & (this.citysCache[queryCode] = parsedData))
          : level === 3 ? ((this.areas = parsedData) & (this.areasCache[queryCode] = parsedData))
          : noop()
          cb && cb()
          this.setControllerStatus(2)
        }, (err) => {
          throw new Error(err)
        }).catch(err => {
          this.setControllerStatus(3)
          console.log(err)
        })
      },
      // 回显时调用
      findMatchedItem (list, target, CST) {
        // parentName = parentName.replace(/省|市|区/g, '')
        console.log(target)
        for (let i = 0, len = list.length; i < len; i++) {
          if (list[i].abbreviated === target) {
            let code = list[i].code
            if (CST >= 1 && CST <= 3) {
              this.selectedCodeList[CST] = code
              this.setSelectVal(list[i], CST)
              if (CST === 1 || CST === 2) {
                return this.queryPipeAsync({ level: CST + 1, code })
              } else {
                break
              }
            }
          }
        }
      },
      // 用于回显 高亮显示
      initValue () {
        if (this.value && !this.echoFlag) {
          this.echoFlag = true
          let selectedList = this.value.split('/')
          let province = selectedList[0]
          let city = selectedList[1]
          let area = selectedList[2]
          let provinceList = this.provinces
          console.log('s')
          // 省市区逐级匹配，目前不支持第四级回显匹配
          this.findMatchedItem(provinceList, province, 1).then(() => {
            return this.findMatchedItem(this.citys, city, 2)
          }).then(() => {
            return this.findMatchedItem(this.areas, area, 3)
          }).then(() => {
            this.selectedCodeListBack = copyList(this.selectedCodeList)
          }).catch(err => {
            throw new Error(err)
          })
        }
      },
      checkIsSelected (item) {
        let cST = this.cST
        return cST >= 1 && cST <= 3 ? this.selectedCodeListBack.indexOf(item.code) !== -1 : item.name === this.selectedFourthBack
      },
      // 点击 清空 按钮触发
      // 1.将组件自身的数据清空
      // 2.通知父组件清空数据
      clearAll () {
        if (!this.hasClick) return
        this.selected = {
          province: {},
          city: {},
          area: {},
          street: {}
        }
        this.$emit('input', this.filterSelected())
        this.cST = 1
        this.citys = []
        this.areas = []
        this.selectedCodeList = ['-1']
        this.selectedCodeListBack = ['-1']
        this.selectedFourthBack = ''
        this.selectedFourth = ''
      },
      // 当接口异常时，点击 重新加载 重新请求省级数据
      reloadHandler () {
        let cST = this.cST
        let queryCode = this.lastQueryCode
        // if (cST < 1 || cST > 4) {
        if (!this.cSTValid) {
          throw new Error('[cST错误]')
        }
        if (cST === 1) {
          this.queryProvince()
        } else if (cST === 2) {
          this.queryCity({ code: queryCode, loading: true })
        } else {
          this.queryArea({ code: queryCode, loading: true })
        }
      },
      // todo 匹配优化
      getMatchData ({ parentName }) {
        let levelForthData = this.levelFourth
        parentName = parentName.replace(/省|市|区/g, '')
        let matchedData = levelForthData.find((ele, index) => {
          return parentName === ele.parentName.replace(/省|市|区/g, '')
          // return parseInt(ele.parentCode) === parseInt(code)
        })
        return matchedData
      },
      setSelectVal ({ code, name, abbreviated }, CST) {
        let cST = CST || this.cST
        cST === 1 ? ((this.selected = { province: {}, city: {}, area: {}, street: {} }) & (this.selected.province = { code, name, abbreviated }))
        : cST === 2 ? (this.selected.area = {}) & (this.selected.street = {}) & (this.selected.city = { code, name, abbreviated })
        : cST === 3 ? ((this.selected.street = {}) & (this.selected.area = { code, name, abbreviated }))
        : cST === 4 ? this.selected.street = { code, name, abbreviated } : noop()
      },
      // 省市区item点击事件
      handleItemClick ({ code, name, abbreviated }, CST) {
        if (!this.userHasClick) {
          this.userHasClick = true
        }
        // 当type === 2时，无abbreviated字段，所以将name兼容到abbreviated
        abbreviated = abbreviated || name
        // 先赋值
        this.setSelectVal({ code, name, abbreviated })
        let cST = CST || this.cST
        if (cST > 0 && cST < 4) {
          this.selectedCodeList[cST] = code
        } else if (cST === 4) {
          this.selectedFourth = name
        }
        if (cST === 1) {
          this.queryCity({ code })
        } else if (cST === 2) {
          this.queryArea({ code })
        } else if (this.slRange === 4 && cST === 3) {
          let selected = this.selected
          let parentName = selected.province.abbreviated + selected.city.abbreviated + selected.area.abbreviated
          let levelForthData = this.getMatchData({ parentName })
          if (levelForthData) {
            this.levelForthLabel = levelForthData.headerLabel
            this.levelForthData = levelForthData.data
          } else {
            this.levelForthLabel = ''
            this.levelForthData = []
            this.selected.street = {}
            this.selectedFourth = ''
          }
          this.hasStreet = !!levelForthData
        }
        if (CST) {
          this.selectedCodeListBack = copyList(this.selectedCodeList)
        }
        // let selected = this.filterSelected()
        // this.$emit('input', selected)
        // todo 如果当前选中的 区 无匹配的街道 将sT置为false 并触发input事件
        if (cST === this.slRange || (cST === this.slRange - 1 && this.slRange === 4 && !this.levelForthData.length)) {
          this.selectedCodeListBack = copyList(this.selectedCodeList)
          this.selectedFourthBack = this.selectedFourth
          // todo 过滤数据 防止父组件接收到undefined值
          let selected = this.filterSelected()
          this.$emit('input', selected)
          this.sT = false
          return
        }
        cST < this.slRange ? this.cST++ : noop()
      },
      /* 两种方式传值 */
      filterSelected () {
        let selected = {}
        let selectedList = []
        let count = 0
        for (var k in this.selected) {
          if (!isEmptyObject(this.selected[k])) {
            selected[k] = this.selected[k]
            selectedList[count++] = this.selected[k].abbreviated
          }
        }
        return selectedList.join('/')
      },
      // 头部省市区点击处理事件
      handleCityHeaderClick (cST) {
        if (cST > 4 || cST < 1) throw new Error('[component area 头部错误]')
        let _cST = this.cST
        // todo 点击了之前一级，就不能点击下一级
        // if (cST > _cST) return
        let selected = this.selected
        if (cST === 2 && isEmptyObject(selected.province)) return
        if (cST === 3 && isEmptyObject(selected.city)) return
        if (cST === 4 && isEmptyObject(selected.area)) return
        // todo 兼容之前处理逻辑，请求接口有值的情况下，为this.cST赋值
        // let queryCode = this.lastQueryCode
        this.setControllerStatus(2)
        // cST === 1 ? this.queryProvince() : cST === 2 ? this.queryCity({ code: queryCode }) : cST === 3 ? this.queryArea({ code: queryCode }) : ''
        _cST <= this.slRange ? this.cST = cST : noop()
      },
      toogleST () {
        this.sT = !this.sT
      },
      hide () {
        this.sT = false
      },
      // 设置controller状态 1: 数据加载中 2: 数据加载成功 3: 数据加载失败
      // dataLoading dataLoaded dataError
      setControllerStatus (status) {
        if (!status || status < 1 || status > 3) {
          throw new Error('[setControllerStatus]方法调用异常')
        }
        let controller = this.controller
        status === 1 ? ((controller.dataLoading = true) & (controller.dataLoaded = false) & (controller.dataError = false))
        : status === 2 ? ((controller.dataLoading = false) & (controller.dataLoaded = true) & (controller.dataError = false))
        : status === 3 ? ((controller.dataLoading = false) & (controller.dataLoaded = false) & (controller.dataError = true)) : noop()
      },
      parseData (data) {
        let ans
        try {
          ans = JSON.parse(data)
        } catch (error) {
          this.setControllerStatus(3)
          throw new Error('[地区接口返回数据无法正确解析]' + data)
        }
        return ans
      },
      queryPipe ({ level, code, cb, loading }) {
        let queryCode = code
        if (!level) {
          throw new Error('[queryPipe参数不合法]')
        }
        if (loading) {
          this.setControllerStatus(1)
        }
        setTimeout(() => {
          this.lastQueryCode = queryCode
          queryAreaJSONP(this.type, level, queryCode).then(({ code, data }) => {
            let parsedData = this.parseData(data)
            level === 1 ? ((this.provinces = parsedData) & (this.provincesCache = parsedData))
            : level === 2 ? ((this.citys = parsedData) & (this.citysCache[queryCode] = parsedData))
            : level === 3 ? ((this.areas = parsedData) & (this.areasCache[queryCode] = parsedData))
            : noop()
            cb && cb()
            this.setControllerStatus(2)
          }, (err) => {
            throw new Error(err)
          }).catch(err => {
            this.setControllerStatus(3)
            console.log(err)
          })
        }, 100)
      },
      queryProvince () {
        if (this.provincesCache[0]) {
          this.provinces = this.provincesCache
          return
        }
        this.queryPipe({ level: 1, code: 0, loading: true })
      },
      queryCity ({ code, cb, loading }) {
        this.citys = []
        this.areas = []
        let citysCache = this.citysCache
        if (citysCache[code]) {
          this.citys = citysCache[code]
        } else {
          this.queryPipe({ level: 2, code, cb, loading })
        }
      },
      queryArea ({ code, cb, loading }) {
        this.areas = []
        let areasCache = this.areasCache
        if (areasCache[code]) {
          this.areas = areasCache[code]
        } else {
          this.queryPipe({ level: 3, code, cb, loading })
        }
      },
      // 检查依赖是否正确，如果slRange是4，则必须传入第四级的数据
      checkDepValid () {
        if (this.slRange === 4 && !this.levelFourth.length) {
          throw new Error('[slRange与levelFourth不匹配]')
        }
      }
    },

    created () {
      this.checkDepValid()
      if (!this.provinces.length) {
        this.queryProvince()
      }
    },

    mounted () {
      let vm = this
      document.addEventListener('click', function () {
        vm.sT = false
      })
    }
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
