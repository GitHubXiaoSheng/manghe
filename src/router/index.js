import Vue from 'vue';
import VueRouter from 'vue-router';
import Navigation from 'vue-navigation';
import routes from './routes';
import author from '@/util/author.js'
import store from '../store';

const router = new VueRouter({
    routes
});
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// 注册一个全局的 before 钩子，对于需要登录才能访问的模块进行控制
router.beforeEach((to, from, next) => {
    console.log(`路由守卫Route before from ${from.name} to ${to.name}`);

    // 设置页面标题
    // rt.setMetaTitle(to.meta.title);
    document.title = to.meta.title;
    //路由守卫
    if (to.meta.guard) {
        next();
    } else {
        if (!store.state.user.userId) {
            author.wxmpLogin().then(user => {
                store.commit('UPDATE_USER', user || {})
                next()
            });
        } else {
            next();
        }
    }
    //路由管控

});
router.afterEach((to, from, failure) => {
    if (!failure) {
        // sendToAnalytics(to.fullPath)
        console.log("路由后置钩子", failure)
    }
})

Vue.use(VueRouter)
Vue.use(Navigation, {
    router,
    keyName: 'key'
})
//Vue.use(VueRouter);

// Vue.use(Navigation, {
//     router,
//     keyName: 'key'
// });
export default router;