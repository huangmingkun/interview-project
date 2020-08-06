// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './assets/css/common/common.css'
import VueI18n from 'vue-i18n' // 引入修改中英文的文件
import myEnLocale from './assets/lang/en' // 引入自定义国际化变量--英文版
import myZhLocale from './assets/lang/zh-cn' // 引入自定义国际化变量--中文版
import enLocale from 'element-ui/lib/locale/lang/en' // 引入element插件国际化--英文版
import zhLocale from 'element-ui/lib/locale/lang/zh-CN' // 引入element插件国际化--中文版
import ElementLocale from 'element-ui/lib/locale' // 引入修改element语言的文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 按需引入element组件
// import {
//   Badge,
//   Button,
//   Card,
//   Checkbox,
//   CheckboxGroup,
//   ColorPicker,
//   Col,
//   DatePicker,
//   Dialog,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Form,
//   FormItem,
//   Header,
//   Icon,
//   Input,
//   Link,
//   Main,
//   Menu,
//   MenuItem,
//   Message,
//   Option,
//   Pagination,
//   Popover,
//   Progress,
//   Radio,
//   RadioGroup,
//   Row,
//   Select,
//   Submenu,
//   Switch,
//   Table,
//   TableColumn,
//   Tabs,
//   TabPane,
//   Tag,
//   TimePicker,
//   Transfer,
//   Upload
// } from 'element-ui'

// 按需引入element-ui
// Vue.use(Badge)
// Vue.use(Button)
// Vue.use(Card)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
// Vue.use(Col)
// Vue.use(ColorPicker)
// Vue.use(DatePicker)
// Vue.use(Dialog)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Header)
// Vue.use(Icon)
// Vue.use(Input)
// Vue.use(Link)
// Vue.use(Main)
// Vue.use(Menu)
// Vue.use(MenuItem)
// Vue.use(Option)
// Vue.use(Pagination)
// Vue.use(Popover)
// Vue.use(Progress)
// Vue.use(Radio)
// Vue.use(RadioGroup)
// Vue.use(Row)
// Vue.use(Select)
// Vue.use(Submenu)
// Vue.use(Switch)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Tabs)
// Vue.use(TabPane)
// Vue.use(Tag)
// Vue.use(TimePicker)
// Vue.use(Transfer)
// Vue.use(Upload)

Vue.prototype.$log = window.console.log
// Vue.prototype.$message = Message
Vue.config.productionTip = false
// ---------------------------------------国际化---------------------------------------
/* vue-i18n */
Vue.use(VueI18n)
const messages = {
  'en': Object.assign(myEnLocale, enLocale),
  'zh-cn': Object.assign(myZhLocale, zhLocale)
}
const lang = localStorage.getItem('user-language') || 'zh-cn'
const i18n = new VueI18n({
  locale: lang,
  messages
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
