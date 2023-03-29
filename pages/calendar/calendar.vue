<template>
	<view class="calendar">
		<view class="calendar-title">
			<uni-icons type="calendar" size="32" color="var(--theme-color)"></uni-icons>
			
			Trip Plan
		</view>
		
		<scroll-view class="calendar-content" :scroll-y="true">
			<view class="calendar-date">
				2023年 3月 
			</view>
			<view class="calendar-item" v-for="(item,index) in 5" :key="index">
				<photo-card  :calendar='true'></photo-card>
			</view>
			
		</scroll-view>
	</view>
</template>

<script setup>
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import { ref, computed, reactive, onMounted } from 'vue';
	import PhotoCard from '../../component/PhotoCart.vue'
	onMounted(() => {
		
	})
	const list2 = ref([{
					title: '买家下单',
					desc: '2018-11-11'
				}, {
					title: '卖家发货',
					desc: '2018-11-12'
				}, {
					title: '买家签收',
					desc: '2018-11-13'
				}, {
					title: '交易完成',
					desc: '2018-11-14'
				}]) 
	const active  = ref(2)
</script>

<style lang="scss" scoped> 
	@import './calendar.scss';
</style>
