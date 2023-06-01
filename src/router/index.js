import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../views/login.vue')
    }
  },
  {
    path: '/',
    name: 'home',
    component: function () {
      return import('../views/HomeView.vue')
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
    path: '/publish',
    name: 'publish',
    component: function () {
      return import('../views/PublishView.vue')
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: function () {
      return import('../views/Setting.vue')
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const pathArr = ['/', '/about']
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('HugoFastghpToken')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})


export default router