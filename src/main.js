import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// element 引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// element plus icon引入
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// vueX的引入
import store from './store/index.js'
app.use(store)

// 路由引入
import router from './router/router.js'
app.use(router)


// 挂载在vue  必须放在最后面
app.mount('#app')