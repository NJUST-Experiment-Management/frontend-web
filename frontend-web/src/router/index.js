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

            // 公共查课路由
            {
                path: '/courseQuery',
                name: 'CourseQuery',
                component: () => import('@/views/CourseQuery')
            },
            {
                path: '/messageList',
                name: 'MessageList',
                component: () => import('@/views/MessageList')
            },

            // 管理员路由
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
                path: '/adminAddAdmin',
                name: 'AdminAddAdmin',
                component: () => import('@/views/AdminAddAdmin')
            },
            {
                path: '/adminExamManage',
                name: 'AdminExamManage',
                component: () => import('@/views/AdminExamManage')
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
            },

            // 老师路由
            {
                path: '/teacherAddCourse',
                name: 'TeacherAddCourse',
                component: () => import('@/views/TeacherAddCourse')
            },
            {
                path: '/teacherAddOpeningCourse',
                name: 'TeacherAddOpeningCourse',
                component: () => import('@/views/TeacherAddOpeningCourse')
            },
            {
                path: '/teacherAdjustCourse',
                name: 'TeacherAdjustCourse',
                component: () => import('@/views/TeacherAdjustCourse')
            },
            {
                path: '/teacherAddArrange',
                name: 'TeacherAddArrange',
                component: () => import('@/views/TeacherAddArrange')
            },
            {
                path: '/teacherDeleteArrange',
                name: 'TeacherDeleteArrange',
                component: () => import('@/views/TeacherDeleteArrange')
            },

            // 学生路由
            {
                path: '/studentCourseArrangement',
                name: 'StudentCourseArrangement',
                component: () => import('@/views/StudentCourseArrangement')
            },
            {
                path: '/studentOpeningClass',
                name: 'StudentOpeningClass',
                component: () => import('@/views/StudentOpeningClass')
            },
            {
                path: '/studentChoose',
                name: 'StudentChoose',
                component: () => import('@/views/StudentChoose')
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
