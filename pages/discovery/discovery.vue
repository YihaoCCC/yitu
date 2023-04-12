<template>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="warn" cancelText="Best wishes" confirmText="Best wishes" title="Special Thanks" content="感谢远在国外的朋友为此页面做的贡献!" @confirm="dialogConfirm"
				@close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<view class="discover">
			<view class="discover-title">
				<text>Discover</text>
				
			</view>
			<view class="discover-type">
				<view class="types">
					<view v-for="(item,index) in discoverTypeData" :key="item.id" class="type-item"
					:class="activeType === item.id ? 'active' : ''" @click="onChange(item)">
						{{item.type}}
					</view>
				</view>
				<uni-icons type="paperplane" size="26"></uni-icons>
			</view>
			<view class="discover-content">
				<z-swiper v-model="list" :options="options">
					<z-swiper-item :custom-style="slideCustomStyle" v-for="(item,index) in list" :key="index">
						
							<image class="image" :src="item.url" mode="aspectFill">
							</image>
							<view class="img-info">
								<view class="img-info-title">
									{{item.title}}
								</view>
								<view class="img-info-place">
									<uni-icons type="location" size="20" color="#989898"></uni-icons>
									<text style="margin-left: 5px;">{{item.place}}</text>
									<view class="author" v-if="item.from">
										{{ item.from }}
									</view>
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
	
	onMounted(() => {
		get_discover_photos()
	})
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
	const classify = ref('home')
	const list = ref([])
	const alertDialog = ref(null)
	const onChange = (item) => {
		activeType.value = item.id
		classify.value = item.value
		if(item.value === 'foreign') {
			alertDialog.value.open()
		}
		get_discover_photos()
	}
	const get_discover_photos = () => {
		uni.yhHttp.get('/discovery/get_discovery_photo', { classify: classify.value }).then(res => {
			console.log(res);
			list.value = res.data.data
		})
	}
</script>

<style lang="scss" scoped>
 @import './discover.scss';
</style>
