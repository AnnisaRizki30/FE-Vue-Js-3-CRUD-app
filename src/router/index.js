//import vue router
import { createRouter, createWebHistory } from 'vue-router'
//import store vuex
import store from '@/store'
//define a routes
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '../views/auth/Login.vue')
    },
    {
        path: '/',
        name: 'home',
        component: () => import( /* webpackChunkName: "home" */ '../views/home/Index.vue'),
        //chek is loggedIn
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/user',
        name: 'user.index',
        component: () => import( /* webpackChunkName: "post.index" */ '../views/user/Index.vue')
    },
    {
        path: '/post',
        name: 'post.index',
        component: () => import( /* webpackChunkName: "post.index" */ '../views/post/Index.vue')
    },
    {
        path: '/create',
        name: 'post.create',
        component: () => import( /* webpackChunkName: "post.create" */ '../views/post/Create.vue')
    },
    {
        path: '/edit/:id',
        name: 'post.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '../views/post/Edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})
//define route for handle authentication
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
    //cek nilai dari getters isLoggedIn di module auth
    if (store.getters['auth/isLoggedIn']) {
    next()
    return
}
next('/login')
} else {
    next()
    }
})
export default router