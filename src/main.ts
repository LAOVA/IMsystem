import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import TIMPlugin from './store/plugins/TIM-plugin/index'

const pinia = createPinia()

// 使用TIM插件
pinia.use(TIMPlugin)

createApp(App).use(Antd).use(pinia).use(router).mount('#app')
