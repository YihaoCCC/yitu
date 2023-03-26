<template>
	<view class="location">
		<view class="location-img-box">
			<image class="img" :src="imgUrl" mode="scaleToFill"></image>
			
		</view>
		<view class="location-info">
			<view class="location-info-header">
				<view class="title">
					Mount Fuji
				</view>
				<view class="place">
					<uni-icons type="location" size="14" style="margin-right: 4px;" color="#e5e5e5" ></uni-icons>
					Honshu, Japan
				</view>
			</view>
	
			<view class="description">
				Description
				<view class="content">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim eget amet viverra eget fames rhoncus.
				</view>
			</view>
			<view class="buttons">
				<button class="explore" @click="goExplore">
					 Explore
				</button>
				<button class="button_next" @click="handleChange">
					 Explore
					 <uni-icons type="arrow-right" size="20"></uni-icons>
				</button>
			</view>
			<view class="little_image">
				<image :src="imgUrl" mode="aspectFill"></image>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import { ref, onMounted } from 'vue'; 
	
	const imgUrl = ref('https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg')
	
	onMounted(() => {
		
	})
	onLoad(()=> {
	})
	
	
	onMounted(() => {
		
	})
	const handleChange = () => {
		imgUrl.value = 'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe3.jpg'
	}
	const goExplore = () => [
		console.log(123)
	]
	
	
	
</script>

<style lang="scss" scoped>
 @import './location.scss';
</style>
