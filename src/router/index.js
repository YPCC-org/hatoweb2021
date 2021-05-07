import Vue from 'vue'
import VueRouter from 'vue-router'

import Top from '@/components/Top.vue'
import Class from '@/components/Class.vue'
import Schedule from '@/components/Schedule.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Top',
        component: Top,
        meta: {
            title: 'トップページ | 鳩Web！',
            desc: ''
        },
    },
    {
        path: '/class',
        name: 'Class',
        component: Class,
        meta: {
            title: 'クラス展 | 鳩Web！',
            desc: ''
        },
    },
    {
        path: '/schedule',
        name: 'Schedule',
        component: Schedule,
        meta: {
            title: 'スケジュール | 鳩Web！',
            desc: ''
        },
    },
]

const router = new VueRouter({
    routes
})

export default router
