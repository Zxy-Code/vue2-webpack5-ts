import Vue from 'vue';
import VueRouter, { RouteConfig } from "vue-router";
const Index = () => import('@comps/home/index.vue');

Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
    {
        path: '*',
        redirect: '/index'
    },
    {
        name:'index',
        path: '/index',
        component: Index
    },
];

const router = new VueRouter({
    mode: 'history',
    // history模式下/表示根目录，需要设置base root
    base: '/demos/home.html',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.path === '/index') {
            return null;
        }
        else {
            return { x: 0, y: 0 }
        }
    }
});

export default router;