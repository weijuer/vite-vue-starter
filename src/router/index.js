import { createRouter, createWebHistory } from 'vue-router';
import NotFound from 'Views/exception/404.vue';

const files = import.meta.glob('./modules/*.js', {
    eager: true,
});

// 路由暂存
const routeModuleList = [];

// 遍历路由模块
Object.keys(files).forEach((key) => {
    const module = files[key].default || {};
    const moduleList = Array.isArray(module) ? [...module] : [module];
    routeModuleList.push(...moduleList);
});

// 存放动态路由
const asyncRouterList = [...routeModuleList];

// 存放固定路由
const defaultRouterList = [
    {
        name: 'NotFound',
        path: '/:pathMatch(.*)*',
        component: NotFound,
    },
];

const routes = [...defaultRouterList, ...asyncRouterList];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return {
            el: '#app',
            top: 0,
            behavior: 'smooth',
        };
    },
});

export default router;
