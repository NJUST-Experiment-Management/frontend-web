// 跨域配置
module.exports = {
    devServer: {
        port: 8080,
        proxy: {                 //设置代理
            '/api': {            //设置拦截器  拦截器格式   斜杠+拦截器名字
                target: 'http://localhost:9090', //代理的目标地址
                changeOrigin: true,              //是否设置同源，输入是的
                pathRewrite: {                   //路径重写
                    '/api': ''                   //选择忽略拦截器里面的单词
                }
            }
        }
    }
}
