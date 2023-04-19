<template>
	<view :class="crossExpandId === imgObj._id ? 'active':''">
		<scroll-view class="card-box" :class="imgObj.imgType === 'vertical' ? 'vertical' : 'cross' " @click="handleClick">
			<image class="card-img" v-show="isImageLoaded" :src="imgObj.url" mode="aspectFill"  @load="onSuccessImg" :lazy-load="true"></image>
			<view class="card-img loading" v-show='!isImageLoaded'>
				<uni-load-more status="loading" :content-text="{contentrefresh: '加载中'}" />
			</view>
			<view class="card-info">
				<view class="title">
					{{ imgObj.title }}
				</view>
				<view class="place">
					<uni-icons type="location" size="14" color="#d3d3d3" style="margin-right: 4px;" ></uni-icons>
					{{ imgObj.place }}
				</view>
				<view class="discription" v-if="imgObj.imgType === 'cross'">
					{{ imgObj.discription }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	const emit =defineEmits(['active', 'goDetail'])
	const props = defineProps({
		calendar: {
			type: Boolean,
			default: false
		},
		imgObj: {
			type: Object,
			default: () => []
		},
		crossExpandId: String,
		isImageLoaded: {
			type: Boolean,
			default: false
		}
	})
	onMounted(() => {
	
	})
	const isImageLoaded = ref(false)
	const handleClick = () => {
		if(props.imgObj.imgType === 'cross')  {
			emit('active', props.imgObj._id)
		} else {
			emit('goDetail', props.imgObj.url)
		}
	}
	const onSuccessImg = () => {
		isImageLoaded.value = true
	}
	
</script>

<style lang="scss" scoped>
	.active  {
		.card-box.cross{
			height: 280px;
			.card-img {
				transition: all .3s ease-in-out;
			}
			.card-info {
				background: linear-gradient(rgba(0,0,0,0),rgba(74, 74, 74, 1.0));
				.discription {
					right: 5%;
					opacity: 1;
				}
			}
		}
	}
	.card-img {
		width: 100%;
		height: 100%;
		&.loading {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.card-box {
		border-radius: 16px;
		box-shadow: 0px 0px 10px #f8f8f8;
		position: relative;
		overflow: hidden;
		margin-right: 14px;
		transition: all .3s ease-in-out; 
		height: 190px;
		
		&.vertical {
			width: 142px;
		}
		&.cross {
			width: calc(100% - 10px);
			margin-bottom: 10px;
			height: 160px;
			.card-img {
				height: 100%;
			}
		}
		.card-info {
			border-radius: 0  0 16px 16px;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 60px;
			background: linear-gradient(rgba(0,0,0,0),rgba(20, 20, 20, 1.0));
			font-size: 14px;
			color: #fff;
			padding: 10px 0 0 15px;
			box-sizing: border-box;
			.title {
				width: 100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.place {
				margin-top: 5px;
				font-size: 12px;
				color: #afafaf;
				display: flex;
				align-items: center;
			}
			.discription {
				position: absolute;
				right: -100%;
				bottom: 32%;
				opacity: 0;
				transition: all .3s cubic-bezier(0,1,0.95,1.05); 
			}
		}	
	}
</style>