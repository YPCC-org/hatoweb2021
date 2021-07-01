import Vue from 'vue'
import VueRouter from 'vue-router'

import Top from '@/components/Top.vue'
import Class from '@/components/Class.vue'
import Schedule from '@/components/Schedule.vue'
import Event from '@/components/Event.vue'
import SchoolEx from '@/components/SchoolExhibition.vue'
import Stage from '@/components/Stage.vue'
import About from '@/components/About.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: '鳩祭',
        component: Top,
        meta: {
            title: 'トップページ | 鳩Web！',
            desc: ''
        },
    },
    {
        path: '/class',
        name: 'クラス展',
        component: Class,
        meta: {
            title: 'クラス展 | 鳩Web！',
            desc: ''
        },
    },
    {
        path: '/schedule',
        name: 'スケジュール',
        component: Schedule,
        meta: {
            title: 'スケジュール | 鳩Web！',
            desc: ''
        },
    },
    {
        path: '/event',
        name: 'イベント',
        component: Event,
        meta: {
            title: 'イベント | 鳩Web！',
            desc: ''
        },
    },
    {
        path: '/schoolex',
        name: '校内展示',
        component: SchoolEx,
        meta: {
            title: '校内展示 | 鳩Web！',
            desc: ''
        },
    },
    {
        path: '/stage',
        name: 'ステージ',
        component: Stage,
        meta: {
            title: 'ステージ | 鳩Web！',
            desc: ''
        },
    },
    {
        path: '/about',
        name: 'このページについて',
        component: About,
        meta: {
            title: 'このページについて | 鳩Web！',
            desc: ''
        },
    },
]

const router = new VueRouter({
    routes
})

export default router
