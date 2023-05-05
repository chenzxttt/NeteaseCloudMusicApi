// history模式

// createWebHashHistory hash模式
// createWebHistory  history模式
import {
    createRouter,
    createWebHistory,
} from 'vue-router'

import Home from '../页面/home.vue'


const routes = [
    // 路由的默认路径
    {
        path: '/',
        redirect: "/login"
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        redirect: '/homeSon',
        children: [{
            path: '/about',
            name: 'about',
            component: () =>
                import('../页面/son/about.vue')
        }, {
            path: '/homeSon',
            name: 'homeSon',
            component: () =>
                import('../页面/son/homeSon.vue')
        }, {
            path: '/music',
            name: 'music',
            component: () =>
                import('../页面/son/music.vue')
        }]

    },

    {
        path: '/login',
        name: 'login',
        component: () =>
            import('../页面/login.vue')
        ,

        children: [
            {
                path: '/logenroll',
                name: 'logenroll',
                component: () =>
                    import('../页面/login页面son/enroll.vue')
            }
        ]

    }
]

// 创建路由对象
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 前置守卫
router.beforeEach((to, from) => {
    const logNum = localStorage.getItem('logNum')
    if (to.name === 'login') {
        if (logNum === 'true') {
            return '/home'
        } else {
            return undefined
        }
    } else {
        if (logNum === 'false') {
            if (to.name === 'logenroll') {
                return undefined
            } else {
                return '/login'
            }
        } else {
            return undefined
        }
    }
})
// 后置守卫
router.afterEach((to) => {
    const pageTitle = to.meta.title || to.name // 获取当前路由的标题
    document.title = pageTitle // 修改网页标题
})
export default router;