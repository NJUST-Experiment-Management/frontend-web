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
	    path: '/myArrangement',
	    name: 'MyArrangement',
	    component: () => import('@/views/MyArrangement')
	  },
	  {
	    path: '/openingClass',
	    name: 'OpeningClass',
	    component: () => import('@/views/OpeningClass')
	  },
	  {
	    path: '/choose',
	    name: 'Choose',
	    component: () => import('@/views/Choose')
	  },
	  {
	    path: '/addtest',
	    name: 'AddTest',
	    component: () => import('@/views/AddTest')
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
