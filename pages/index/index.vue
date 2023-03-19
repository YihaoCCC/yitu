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
			<view class="home-type-change">
				<view v-for="(item,index) in photoTypeData" :key="item.id" class="type-item"
				:class="activeType === item.id ? 'active' : ''" @click="activeType=item.id">
					{{item.type}}
				</view>
			</view>	
			<view class="home-experiences">
					<view class="content-title">
						Popular Experiences
					</view>
					<view class="content" >
						<PhotoCart v-for="item in experiences" :imgUrl='item.url' :title='item.title' :place='item.place' :imgType='item.imgType'></PhotoCart>
					</view>
			</view>
			<view class="home-featured">
				<view class="content-title">
					Featured
				</view>
				<view class="content" :scroll-y="true">
					<PhotoCart v-for="item in feature" :imgUrl='item.url' :title='item.title' :place='item.place' :imgType='item.imgType'></PhotoCart>
				</view>
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
	import { photoType as photoTypeData} from '../../utils/publicData/index-type'
	const name=ref('cyh') 
	// const screenHeight=ref('') 
	const goHome = ref(false)
	const feature =ref([])
	const experiences = ref([])
	const activeType = ref(1)
	onLoad(()=> {
		// screenHeight.value = uni.getSystemInfoSync().windowHeight;
		uni.hideTabBar()
		
		})
	onMounted(() => {
		uni.yhHttp.get('/get_all_photos', { imgType: "vertical" }).then(res => {
			console.log(res);
			experiences.value = res.data.data
		})
		uni.yhHttp.get('/get_all_photos', { imgType: 'cross' }).then(res => {
			feature.value = res.data.data
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
