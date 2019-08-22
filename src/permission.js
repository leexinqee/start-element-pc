import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getSkey } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

// const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.path === '/login') {
    next()
    NProgress.done()
  } else {
    if (getSkey()) {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          next()
        })
      } else {
        next()
        NProgress.done()
      }
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
