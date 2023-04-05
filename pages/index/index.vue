<template>
	<view class="container">
		<view class="welcomePage" style="100vh" 
		:class="goHome ? 'goHome' : '' " >
			<view class="title">
				Forgot Busy Work
				Start Next Vacation
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
		<scroll-view class="home" :scroll-y="true">
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
					<image src="../../static/avtar.jpg" mode=""></image>
				</view>
			</view>
			<view class="home-type-change">
				<view v-for="(item,index) in photoTypeData" :key="item.id" class="type-item"
				:class="activeType === item.id ? 'active' : ''" @click="typeChange(item)">
					{{item.type}}
				</view>
			</view>	
			<view class="content-title">
				Popular Experiences
			</view>
			<view class="home-experiences">
					
					<view class="content" >
						<PhotoCart v-for="item in experiences"  :key="item.id" :imgObj='item'></PhotoCart>
					</view>
			</view>
			<view class="content-title">
				<text>Featured</text>
				<view class="more">
					More
					<uni-icons type="arrow-right" size="20"></uni-icons>
				</view>
			</view>
			<view class="content" >
				<PhotoCart  @active = "crossExpandFun" :crossExpandId='crossExpand' v-for="(item,index) in feature" :key="item.id"  :imgObj='item' ></PhotoCart>
			</view>
			<view class="home-featured">
				
				
			</view>
		</scroll-view>
		<uni-popup ref="popup" type="message">
			<uni-popup-message type="warn" message="图片数量较少,请优先体验功能!" :duration="600"></uni-popup-message>
		
		</uni-popup>
	</view>
</template>

<script setup>
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import { ref, computed, onMounted, } from 'vue'; 
	import PhotoCart from '../../component/PhotoCart.vue'
	import { photoType as photoTypeData} from '../../utils/publicData/index-type'
	const name=ref('cyh') 
	const popup = ref(null);
	// const screenHeight=ref('') 
	const goHome = ref(false)
	const feature =ref([])
	const experiences = ref([])
	const activeType = ref(100)
	const crossExpand = ref('123')
	onLoad(()=> {
		// screenHeight.value = uni.getSystemInfoSync().windowHeight;
		uni.hideTabBar()
	})
	onMounted(() => {
		uni.yhHttp.get('/fun/get_all_photos', { imgType: "vertical" }).then(res => {
			experiences.value = res.data.data.sort(function(){return Math.random()>0.5?-1:1;})
		})
		uni.yhHttp.get('/fun/get_all_photos', { imgType: 'cross' }).then(res => {
			feature.value = res.data.data.sort(function(){return Math.random()>0.5?-1:1;})
		})
	})
	const showHomePage = () => {
		
		goHome.value = true
		setTimeout(() => {
			uni.setNavigationBarColor({
				backgroundColor: '#ffffff',
				animation: { duration: 800, timingFunc: 'linear' },
				frontColor: '#000000'
			})
			uni.showTabBar()
		}, 800)
		setTimeout(() => {
			popup.value.open()
		}, 2000)
	}
	const typeChange = (item) => {
		activeType.value = item.id
		popup.value.open()
		
	}
	const crossExpandFun = (payload) => {
		console.log(payload);
		crossExpand.value = payload
	}
	
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
