<template>
	<el-config-provider :locale="locale">
		<router-view v-wechat-title='$route.meta.title' />
	</el-config-provider>
</template>

<script>
	import {
		ElConfigProvider
	} from 'element-plus'

	import zhCn from 'element-plus/lib/locale/lang/zh-cn'
	export default {
		name: "App",
		components: {
			[ElConfigProvider.name]: ElConfigProvider,
		},
		data() {
			return {
				locale: zhCn,
			}
		},
		created() {
			//在页面加载时读取sessionStorage里的状态信息
			if (sessionStorage.getItem("store")) {
				this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
			}

			//在页面刷新时将vuex里的信息保存到sessionStorage里
			window.addEventListener("beforeunload", () => {
				sessionStorage.setItem("store", JSON.stringify(this.$store.state))
			})
			/*看板娘初始化
				      参数说明
				      model 模型的配置
				         json 文件资源路径，可以支持网络路径，此处使用的是相对路径
				         scale 模型缩放系数
				      display 模型布局
				         position 位置
				         width 宽度
				         height 高度
				         hOffset 水平偏移量
				         vOffset 垂直偏移量
				      mobile 移动端配置
				         show 显示/隐藏
				         scale 缩放比例
				      react 模型矩形框样式
				         opacity 透明度
				         opacityDefault 默认透明度
				         opacityOnHover 鼠标悬浮透明度
				    */

			setTimeout(() => {
				window.L2Dwidget.init({
					pluginRootPath: '../static/live2dw/',
					pluginJsPath: 'lib/',
					pluginModelPath: 'live2d-widget-model-koharu/assets/', //中间这个haru_2就是你的老婆,想换个老婆,换这个就可以了
					tagMode: false,
					debug: false,
					model: {
						jsonPath: '../static/live2dw/live2d-widget-model-koharu/assets/koharu.model.json',
						scale: 1
					},
					display: {
						position: 'right',
						width: 210,
						height: 480,
						vOffset:-100
					}, //调整大小,和位置
					mobile: {
						show: true
					}, //要不要盯着你的鼠标看
					log: false,
				})
			}, 1000)
			
			
			//
		},
		
	}
</script>
