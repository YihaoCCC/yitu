<template>
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="warn" cancelText="关闭" confirmText="同意" title="通知" content="功能正在完善中-----!" @confirm="dialogConfirm"
			@close="dialogClose"></uni-popup-dialog>
	</uni-popup>
	<view class="location">
		<view class="location-img-box">
			<z-swiper v-model="loactionList" >
				<z-swiper-item v-for="(item,index) in loactionList" :key="index">
					<image class="image" :src="item.url" mode="aspectFill">
					</image>
					<view class="location-info">
						
							<view class="title">
								{{item.place}}
							</view>
							<view class="place">
								<uni-icons type="location" size="14" style="margin-right: 4px;" color="#e5e5e5" ></uni-icons>
								{{item.sure_place}}
							</view>
						
						<view class="buttons">
							<button class="myBotton"  @click="goExplore(item)">
							 explore
							 <uni-icons color="#fff" type="paperplane-filled" size="20"></uni-icons>
							</button>
						</view>
						<view class="little_image">
							<image :src="item.url" mode="aspectFill"></image>
						</view>
					</view>
				</z-swiper-item>
			</z-swiper>
		</view>	
	</view>
</template>

<script setup>
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import { ref, onMounted,reactive  } from 'vue'; 
	
	const loactionList = ref([])
	const msgType = ref('info')
	const alertDialog = ref(null);
	onMounted(() => {
		uni.yhHttp.get('/location/get_location_photo').then(res => {
			loactionList.value = res.data.data.sort(function(){return Math.random()>0.5?-1:1;})
		})
		setTimeout(() => {
			goExplore()
		}, 2000)
	})
	const handleChange = () => {
		imgUrl.value = 'https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe3.jpg'
		onChange.value = !onChange.value
	}
	const goExplore = (item) => {
		alertDialog.value.open()
	}

	
	
</script>

<style lang="scss" scoped>
 @import './location.scss';
</style>
