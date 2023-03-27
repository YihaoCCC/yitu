<template>
		<view class="discover">
			<view class="discover-title">
				<text>Discover</text>
				<uni-icons type="paperplane" size="26"></uni-icons>
			</view>
			<view class="discover-type">
				<view v-for="(item,index) in discoverTypeData" :key="item.id" class="type-item"
				:class="activeType === item.id ? 'active' : ''" @click="activeType=item.id">
					{{item.type}}
				</view>
			</view>
			<view class="discover-content">
				<z-swiper v-model="list" :options="options">
					<z-swiper-item :custom-style="slideCustomStyle" v-for="(item,index) in list" :key="index">
						
							<image class="image" :src="item" mode="aspectFill">
							</image>
							<view class="img-info">
								<view class="img-info-title">
									Al Masjid an Nabawi
								</view>
								<view class="img-info-place">
									3 km away
								</view>
							</view>
						
					</z-swiper-item>
				</z-swiper>
			</view>
		</view>

</template>

<script setup>
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import { ref, computed, onMounted,  reactive} from 'vue'; 
	
	import { discoverType as discoverTypeData} from '../../utils/publicData/discover-type'
	const activeType = ref(1)
	const onSwiper = (swiper) => {
		console.log(swiper);
	  };
	  const onSlideChange = () => {
		console.log('slide change');
	  };
	const slideCustomStyle = reactive({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '36rpx'
	})
	const options = reactive({
		effect: 'cards',
		loop: true,
		autoplay:true,
		cardsEffect: {
			perSlideOffset: 12,
			perSlideRotate: 0
		}
	})
	const list = ref([
		'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe1.jpg',
		'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe2.jpg',
		'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe3.jpg',
		'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe4.jpg',
		'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe5.jpg',
	])
</script>

<style lang="scss" scoped>
 @import './discover.scss';
</style>
