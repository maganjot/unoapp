import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Login from '../components/login'
import Menu from '../components/Menu/menu-page.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/menu-page/:locationID',
      name: 'menu-page',
      component: Menu,
      props (route) {
        return {locationID: route.query.locationID}
      }
    }
  ]
})

// Router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     const authUser = JSON.parse(window.localStorage.getItem('authUser'))
//     if (authUser && authUser.access_token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   }
//   next()
// })
