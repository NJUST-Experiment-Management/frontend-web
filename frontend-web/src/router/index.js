import {
	createRouter,
	createWebHistory
} from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [{
		path: '/',
		name: 'Layout',
		component: Layout,
		redirect: "/lab",
		children: [{
				path: '/lab',
				name: 'Lab',
				component: () => import('@/views/Lab'),
				meta:{
					title:'首页'
				}
			},

			// 公共查课路由
			{
				path: '/courseQuery',
				name: 'CourseQuery',
				component: () => import('@/views/CourseQuery'),
				meta:{
					title:'课程查询'
				}
			},
			{
				path: '/messageList',
				name: 'MessageList',
				component: () => import('@/views/MessageList'),
				meta:{
					title:'消息列表'
				}
			},

			// 管理员路由
			{
				path: '/adminRoomManage',
				name: 'AdminRoomManage',
				component: () => import('@/views/AdminRoomManage'),
				meta:{
					title:'机房管理'
				}
			},

			{
				path: '/adminAddRoom',
				name: 'AdminAddRoom',
				component: () => import('@/views/AdminAddRoom'),
				meta:{
					title:'机房添加'
				}
			},

			{
				path: '/adminRoomHistory',
				name: 'AdminRoomHistory',
				component: () => import('@/views/AdminRoomHistory'),
				meta:{
					title:'机房使用历史'
				}
			},
			{
				path: '/adminAddAdmin',
				name: 'AdminAddAdmin',
				component: () => import('@/views/AdminAddAdmin'),
				meta:{
					title:'添加管理员'
				}
			},
			{
				path: '/adminAddUsers',
				name: 'AdminAddUsers',
				component: () => import('@/views/AdminAddUsers'),
				meta:{
					title:'用户导入'
				}
			},
			{
				path: '/adminMsgRelease',
				name: 'AdminMsgRelease',
				component: () => import('@/views/AdminMsgRelease'),
				meta:{
					title:'消息发布'
				}
			},
			{
				path: '/teacherUpdateCourse',
				name: 'TeacherUpdateCourse',
				component: () => import('@/views/TeacherUpdateCourse'),
				meta:{
					title:'课程信息修改'
				}
			},

			// 老师路由
			{
				path: '/teacherAddCourse',
				name: 'TeacherAddCourse',
				component: () => import('@/views/TeacherAddCourse'),
				meta:{
					title:'添加课程'
				}
			},
			{
				path: '/teacherAddOpeningCourse',
				name: 'TeacherAddOpeningCourse',
				component: () => import('@/views/TeacherAddOpeningCourse'),
				meta:{
					title:'添加开放性实验'
				}
				
			},
			{
				path: '/teacherAdjustCourse',
				name: 'TeacherAdjustCourse',
				component: () => import('@/views/TeacherAdjustCourse'),
				meta:{
					title:'我的课程'
				}
			},
			{
				path: '/teacherAddArrange',
				name: 'TeacherAddArrange',
				component: () => import('@/views/TeacherAddArrange'),
				meta:{
					title:'添加课程安排'
				}
			},
			{
				path: '/teacherDeleteArrange',
				name: 'TeacherDeleteArrange',
				component: () => import('@/views/TeacherDeleteArrange'),
				meta:{
					title:'课程安排管理'
				}
			},

			// 学生路由
			{
				path: '/studentCourseArrangement',
				name: 'StudentCourseArrangement',
				component: () => import('@/views/StudentCourseArrangement'),
				meta:{
					title:'我的课程安排'
				}
			},
			{
				path: '/studentOpeningClass',
				name: 'StudentOpeningClass',
				component: () => import('@/views/StudentOpeningClass'),
				meta:{
					title:'开放性实验列表'
				}
			},
			{
				path: '/studentChoose',
				name: 'StudentChoose',
				component: () => import('@/views/StudentChoose'),
				meta:{
					title:'开放性实验选择'
				}
			}

		]
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import("@/views/Login"),
		meta:{
			title:'登录'
		}
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

let okpath = ["/login"]

router.beforeEach((to, from, next) => {
	if (!okpath.includes(to.path)) {
		// 判断sessionStorage是否保存了用户信息
		let userStr = sessionStorage.getItem("user") || "{}"
		let user = JSON.parse(userStr)
		if (!user.userId) {
			// 跳转到登录页面
			next({
				path: "/login"
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
