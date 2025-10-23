import { createRouter, createWebHistory } from 'vue-router'

// 使用懒加载引入组件
const Login = () => import('@/views/Login.vue')
const FanYeList = () => import('@/views/FanYeList.vue')

const routes = [
    {
        path: '/',
        redirect: '/login'  // 根路径重定向到登录页
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/FanYeList',
        name: 'FanYeList',
        component: FanYeList,
        meta: {
            requiresAuth: true
        }
    },
    // 添加一个404页面兜底
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    },
    // 在 router/index.js 的 routes 数组中添加
    {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/Test.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    // 如果需要登录权限
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token')
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router
