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
        component: Top
    },
    {
        path: '/class',
        name: 'Class',
        component: Class
    },
    {
        path: '/schedule',
        name: 'Schedule',
        component: Schedule
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
