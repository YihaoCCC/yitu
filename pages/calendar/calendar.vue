<template>
	<view class="calendar" :style="{overflow: disabledScroll ? 'hidden' : 'auto'}">

		<view class="calendar-card" :style="transform" :class="active === index ? 'active' : ''"
			v-for="(item,index) in 5" :key="index" @click="(e) => activeCard(index, e)">

			<image class="card-img" src="https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg"
				mode="aspectFill"></image>

			<view class="date">
				<uni-icons class="calendar-icon" type="calendar" size="30" color="#fff"></uni-icons>
				<text class="text">Thursday, July 28th to July 31st</text>
			</view>
			<view class="close" @click.stop="close">
				<uni-icons type="closeempty" size="20" color="#fff"></uni-icons>
			</view>
			<view class="content-warpper">

				<image src="https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg" mode="aspectFill"></image>
				<image src="https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg" mode="aspectFill"></image>
				<image
					src="https://mp-3063b247-015d-4a4e-af76-296e5a85e6a4.cdn.bspapp.com/cloudstorage/e873ba5a-58a4-4669-8334-b683a644291e.jpg"
					mode=" aspectFill"></image>
				<image
					src="https://mp-3063b247-015d-4a4e-af76-296e5a85e6a4.cdn.bspapp.com/cloudstorage/82326693-14ee-4a48-8d07-bb23ea6fdcf0.png"
					mode="aspectFill"></image>
				<image src="https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg" mode="aspectFill"></image>
				<image src="https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg" mode="aspectFill"></image>
				<image
					src="https://mp-3063b247-015d-4a4e-af76-296e5a85e6a4.cdn.bspapp.com/cloudstorage/e873ba5a-58a4-4669-8334-b683a644291e.jpg"
					mode=" aspectFill"></image>
				<image
					src="https://mp-3063b247-015d-4a4e-af76-296e5a85e6a4.cdn.bspapp.com/cloudstorage/82326693-14ee-4a48-8d07-bb23ea6fdcf0.png"
					mode="aspectFill"></image>
				<image src="https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg" mode="aspectFill"></image>
				<image src="https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg" mode="aspectFill"></image>
				<image
					src="https://mp-3063b247-015d-4a4e-af76-296e5a85e6a4.cdn.bspapp.com/cloudstorage/e873ba5a-58a4-4669-8334-b683a644291e.jpg"
					mode=" aspectFill"></image>
				<image
					src="https://mp-3063b247-015d-4a4e-af76-296e5a85e6a4.cdn.bspapp.com/cloudstorage/82326693-14ee-4a48-8d07-bb23ea6fdcf0.png"
					mode="aspectFill"></image>

			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow,
		onPageScroll
	} from "@dcloudio/uni-app";
	import {
		ref,
		computed,
		reactive
	} from 'vue';

	const active = ref(1000)
	const transform = ref('')
	const disabledScroll = ref(false)
	const activeCard = (index, e) => {
		setTimeout(() => {
			uni.hideTabBar()
		}, 500)
		disabledScroll.value = true
		console.log(window);
		// 盒子只触发一次点击事件
		if (active.value !== index) {
			active.value = index
			let selectorQuery = uni.createSelectorQuery();
			selectorQuery.selectAll('.calendar-card').boundingClientRect((rects) => {
				console.log(rects);
				if (index === 4) {
					transform.value = `--move-height: -${rects[index].top + 50}px`
				} else {
					transform.value = `--move-height: -${rects[index].top}px`
				}
			}).exec()
		}
	}
	const close = () => {
		active.value = 999
		disabledScroll.value = false
		setTimeout(() => {
			uni.showTabBar()
		}, 800)
	}
</script>

<style lang="scss" scoped>
	@import './calendar.scss';
</style>