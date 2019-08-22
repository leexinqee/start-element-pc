import Vue from 'vue'
import Router from 'vue-router'
// import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "basic" */ '@/views/dashboard/index')
  },
  /*{
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(/!* webpackChunkName: "dashboard" *!/ '@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  }*/
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// export const asyncRouterMap = [
//   { path: '*', redirect: '/404', hidden: true }
// ]
