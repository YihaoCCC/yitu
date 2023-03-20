<template>
	<view class="discover">
		<view class="discover-title">
			<text>Discover</text>
			<uni-icons type="search" size="26"></uni-icons>
		</view>
		<view class="discover-type">
			<view v-for="(item,index) in discoverTypeData" :key="item.id" class="type-item"
			:class="activeType === item.id ? 'active' : ''" @click="activeType=item.id">
				{{item.type}}
			</view>
		</view>
		<view class="discover-content">
			
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
	import { discoverType as discoverTypeData} from '../../utils/publicData/discover-type'
	const activeType = ref(1)
</script>

<style lang="scss" scoped>
 @import './discover.scss';
</style>
