<template>
	<view class="calendar">
		<view class="calendar-title">
			Trip Plan
		</view>
		<view class="calendar-content">
			<photo-card v-for="(item,index) in 5" :key="index" :calendar='true'></photo-card>
		</view>
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
