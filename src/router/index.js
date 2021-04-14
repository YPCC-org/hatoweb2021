import Vue from 'vue'
import VueRouter from 'vue-router'

import Top from '@/components/Top.vue'
import Class from '@/components/Class.vue'

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
    }
]

const router = new VueRouter({
    routes
})

export default router
