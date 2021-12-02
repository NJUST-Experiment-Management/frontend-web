import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: "/adminPage",
    children: [
      {
        path: '/adminPage',
        name: 'AdminPage',
        component: () => import('@/views/AdminPage')
      },
        {
            path: '/adminExamManage',
            name: 'AdminExamManage',
            component: () => import('@/views/AdminExamManage')
        },
        {
            path: '/adminRoomManage',
            name: 'AdminRoomManage',
            component: () => import('@/views/AdminRoomManage')
        },

        {
            path: '/adminAddRoom',
            name: 'AdminAddRoom',
            component: () => import('@/views/AdminAddRoom')
        },

        {
            path: '/adminRoomHistory',
            name: 'AdminRoomHistory',
            component: () => import('@/views/AdminRoomHistory')
        },
        {
            path: '/courseQuery',
            name: 'CourseQuery',
            component: () => import('@/views/CourseQuery')
        },
        {
            path: '/adminAddAdmin',
            name: 'AdminAddAdmin',
            component: () => import('@/views/AdminAddAdmin')
        },
      {
        path: '/adminMsgHistory',
        name: 'AdminMsgHistory',
        component: () => import('@/views/AdminMsgHistory')
      },
      {
        path: '/adminMsgRelease',
        name: 'AdminMsgRelease',
        component: () => import('@/views/AdminMsgRelease')
      }
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
//限制某些页面禁止未登录访问
// let limitPagePath = ["/adminPage"]
let limitPagePath = []
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
