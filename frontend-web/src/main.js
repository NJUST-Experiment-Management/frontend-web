import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'mockjs'
import './mock/index'
import "./assets/style/theme/index.css";
import 'element-plus/dist/index.css'
import '@/assets/css/global.css'
eval(process.env.VUE_APP_MOCK) && require('@/mock');

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')
