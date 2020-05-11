import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import Login from '../components/login.vue'
import welcome from '../components/welcome.vue'
import user from '../components/user/user.vue'
import rights from '../components/power/rights.vue'
import roles from '../components/power/roles.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', component: Home,
    children: [
      { path: '/', component: welcome }
    ]
  },

  { path: '/login', component: Login },

  {
    path: '/home',
    component: Home,
    /*     redirect: '/welcome',
        children: [{ path: '/welcome', component: welcome } */
    children: [
      { path: '/home', component: welcome },
      { path: '/users', component: user },
      { path: '/rights', component: rights },
      { path: '/roles', component: roles },
    ]
  },


]

const router = new VueRouter({
  routes
})
router.beforeEach((to, fron, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
