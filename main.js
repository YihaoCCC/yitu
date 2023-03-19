import http from './http/index.js'
//从网络请求包中引入$http请求对象
uni.yhHttp = http

uni.yhToast = function(options) {
	return uni.showToast({
		title: options.title || '数据加载失败！',
		duration: options.duration || 1500,
		icon: options.icon || 'none'
	})
}


// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import './main.css'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
