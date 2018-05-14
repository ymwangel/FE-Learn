import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import App1 from './App1.vue'
import F from '../lib/function.js'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  components:{"app": App,"app1": App1}
})
