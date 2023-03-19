<template>
	<view class="container">
		<view class="welcomePage" style="100vh" 
		:class="goHome ? 'goHome' : '' " >
			<view class="title">
				Explore and discover new vistas
			</view>
			<text>
				Browse through a large number of interesting travel albums and choose some locations for yourself. 
				The world is waiting for you to explore
			</text>
			<button 
				@click="showHomePage" 
				:class="goHome ? 'removeButton' : '' ">
				Get Started
			</button>
		</view>
		<view class="home">
			<view class="home-header">
				<view class="header-title">
					<view class="name">
						Hello，我是陈一奕
					</view>
					<view class="slogan">
						Let's Travel
					</view>
				</view>
				<view class="avtar">
					<image src="../../static/index-bg.png" mode=""></image>
				</view>
			</view>
			<view class="">
				周日工作内容！！！
				tabbar 切换
				https 和 showtost组件封装
			</view>
			<view class="home-experiences">
				
					<template v-for="item in experiences">
						<PhotoCart :imgUrl='item.url' :title='item.title' :place='item.place'></PhotoCart>
					</template>
				
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import {
	ref,
	computed,
	onMounted,
	} from 'vue'; 
	import PhotoCart from '../../component/PhotoCart.vue'
	const name=ref('cyh') 
	const screenHeight=ref('') 
	const goHome = ref(false)
	const testData =ref('')
	const experiences = ref([])
	onLoad(()=> {
		screenHeight.value = uni.getSystemInfoSync().windowHeight;
		uni.hideTabBar()
		
		})
	onMounted(() => {
		uni.yhHttp.get('/get_all_photos').then(res => {
			testData.value = res.data.data[0].discription
			experiences.value = res.data.data
		})
	})
	const showHomePage = () => {
		uni.showTabBar()
		goHome.value = true
		setTimeout(() => {
			uni.setNavigationBarColor({
				backgroundColor: '#ffffff',
				animation: { duration: 800, timingFunc: 'linear' },
				frontColor: '#000000'
			})
		}, 800)

	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
