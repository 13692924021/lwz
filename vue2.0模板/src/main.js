import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import axios from "@/http/http.js"

Vue.prototype.$axios = axios

import router from "@/router/router.js"

import "@/assets/js/unit.js"


// 自定义组件
import myMenu from "@/components/menu/menu.vue"
import myTable from "@/components/Table/Table.vue"
import myNav from "@/components/myNav/myNav.vue" 
import myEditor from "@/components/editor/editor.vue" 

Vue.component("myEditor", myEditor)
Vue.component("myNav", myNav)
Vue.component("myTable", myTable)
Vue.component("myMenu", myMenu)

// iView
import ViewUI from 'view-design';
import './main.less';
Vue.use(ViewUI);


// import { RecycleScroller } from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// Vue.component('RecycleScroller', RecycleScroller)


//vuex
import store from "@/vuex/store.js"
import AgoraRTC from "@/assets/js/AgoraRTC.js"
Vue.prototype.AgoraRTC = AgoraRTC

import {conn, WebIM} from "@/assets/js/websdk.js"
Vue.prototype.$conn = conn
Vue.prototype.$WebIM = WebIM

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
