import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: function () {
      return import('../views/HomeView.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../views/login.vue')
    }
  },
  {
    path: '/edit',
    name: 'edit',
    component: function () {
      return import('../views/EditView.vue')
    }
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import('../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const pathArr = ['/', '/about']
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('ghpToken');
    if (token) {
      next()
    } else {

    }
  } else {
    next()
  }
})


export default router