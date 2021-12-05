import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: "/lab",
    children: [
      {
        path: '/lab',
        name: 'Lab',
        component: () => import('@/views/Lab')
      },
	  {
	    path: '/addCourse',
	    name: 'AddCourse',
	    component: () => import('@/views/AddCourse')
	  },
	  {
	    path: '/addOpeningCourse',
	    name: 'AddOpeningCourse',
	    component: () => import('@/views/AddOpeningCourse')
	  },
	  {
	    path: '/adjustCourse',
	    name: 'AdjustCourse',
	    component: () => import('@/views/AdjustCourse')
	  },
	  {
	    path: '/addArrange',
	    name: 'AddArrange',
	    component: () => import('@/views/AddArrange')
	  },
	  {
	    path: '/deleteArrange',
	    name: 'DeleteArrange',
	    component: () => import('@/views/DeleteArrange')
	  },
	  {
	    path: '/setAdmin',
	    name: 'SetAdmin',
	    component: () => import('@/views/SetAdmin')
	  },
	  {
	    path: '/setAdmin',
	    name: 'SetAdmin',
	    component: () => import('@/views/SetAdmin')
	  },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 限制某些页面禁止未登录访问
let limitPagePath = ["/lab"]

router.beforeEach((to, from, next) => {
  if (limitPagePath.includes(to.path)) {
    // 判断sessionStorage是否保存了用户信息
    let userStr = sessionStorage.getItem("user") || "{}"
    let user = JSON.parse(userStr)
    if (!user.userId) {
      // 跳转到登录页面
      next({path: "/login"})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
