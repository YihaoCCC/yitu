<template>
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="warn" cancelText="我愿意等" confirmText="我愿意等" title="Some Some Some" content="表捉急, 我得上班,功能慢慢开发!" @confirm="dialogConfirm"
			@close="dialogClose"></uni-popup-dialog>
	</uni-popup>
	<view class="calendar" :style="{overflow: disabledScroll ? 'hidden' : 'auto'}" >

		<view class="calendar-card" :style="transform" :class="active === index ? 'active' : ''"
			v-for="(dayInfo,index) in calenderData" :key="index" @click="(e) => activeCard(index, e)" @touchstart="start" @touchend="backClose">
			<view class="" style="overflow: hidden;border-radius: 16px;height: 260px;">
				<image class="card-img" :src="dayInfo.coverImg" mode="aspectFill"></image>
				
			</view>

			<view class="date">
				<uni-icons class="calendar-icon" type="calendar" size="30" color="#fff"></uni-icons>
				<text class="text">{{dayInfo.date}}</text>
			</view>
			<view class="place-title">
				<view class="title">
					{{dayInfo.title}} 
				</view>
				<view class="place">
					<uni-icons type="location" size="20" color="#fff" style="margin-right: 5px;"></uni-icons> {{ dayInfo.place }}
				</view>
				
			</view>
			<view class="close" @click.stop="close">
				<uni-icons type="closeempty" size="20" color="#fff"></uni-icons>
			</view>
			<view class="content-warpper">
				<view class="content-left">
					<template v-for="(item, index) in dayInfo.imgList" :key="index">
						<view class="content-item" v-if="index % 2 == 1" @click="goDetail(item.imgUrl)">
							<image class='content-item-image' :src="item.imgUrl" mode="widthFix" ></image>
						</view>
					</template>
				</view>
				<view class="content-right">
					<template v-for="(item, index) in dayInfo.imgList" :key="index">
						<view class="content-item" v-if="index % 2 == 0" @click="goDetail(item.imgUrl)">
							<image class='content-item-image' :src="item.imgUrl" mode="widthFix" ></image>
						</view>
					</template>
				</view>
			</view>
		</view>
		<view class="addAlbum" @click="addAlbum">
			+ Create a new album
		</view>
		
	</view>
	<ModelDetail :imgUrl='detailImgUrl' v-if="showDetailModal" @close='closeDetail'></ModelDetail>
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
		reactive,
		onMounted
	} from 'vue';
	import ModelDetail from '../../component/ModalDetail.vue'
	const clientX = ref()
	const active = ref(1000)
	const transform = ref('')
	const disabledScroll = ref(false)
	const calenderData = ref([])
	const alertDialog = ref(null)
	const showDetailModal = ref(false)
	const detailImgUrl = ref('')
	onMounted(() => {
		get_calendar_photos()
	})
	const activeCard = (index, e) => {
		uni.hideTabBar()
		disabledScroll.value = true
		console.log(window);
		// 盒子只触发一次点击事件
		if (active.value !== index) {
			active.value = index
			let selectorQuery = uni.createSelectorQuery();
			selectorQuery.selectAll('.calendar-card').boundingClientRect((rects) => {
				console.log(rects);
				transform.value = `--move-height: -${rects[index].top}px`
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
	const start = (e) => {
		clientX.value = e.changedTouches[0].clientX;             
	}
	const backClose = (e) => {
			const subX = e.changedTouches[0].clientX - clientX.value;
			if( subX > 110){
				console.log('右滑')
				active.value = 999
				disabledScroll.value = false
				setTimeout(() => {
					uni.showTabBar()
				}, 800)
				
			}else if( subX < -110){
				console.log('左滑')
				
			}else{
				console.log('无效')
			}
	}
	const get_calendar_photos = () => {
		uni.yhHttp.get('/calendar/get_calendar_photo').then(res => {
			console.log(res);
			calenderData.value = res.data.data.sort((a,b) => a.sort - b.sort)
		})
		
	}
	
	const addAlbum = () => {
		alertDialog.value.open()
	}
	const goDetail = (payload) => {
		showDetailModal.value = true
		detailImgUrl.value = payload
	}
	const closeDetail = () => {
		setTimeout(() => {
			showDetailModal.value = false
		}, 500)
	}
</script>

<style lang="scss" scoped>
	@import './calendar.scss';
</style>