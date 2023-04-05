<template>
	<view class="calendar-card" v-if="calendar">
		<image class="card-img" src="https://cdn.zebraui.com/zebra-ui/images/swipe-demo/swipe1.jpg" mode="aspectFill" @load="onSuccessImg" v-show='isImageLoaded'></image>
		<view class="card-img loading" v-show='!isImageLoaded'>
			<uni-load-more status="loading" :content-text="{contentrefresh: '加载中'}" />
		</view>
		<view class="model">
			<view class="model-title">
				Madinah Mosque Nabawi
			</view>
			<view class="model-date">
				Thursday, July 28th to July 31st
			</view>
			<view class="guide">
				<view class="arrow arrow-1"></view>
				<view class="arrow arrow-2" ></view>
				<view class="arrow arrow-3" ></view>
			</view>
		</view>
		
	</view>
	<view v-else :class="crossExpandId === imgObj._id ? 'active':''">
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
	const emit =defineEmits(['active'])
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
			uni.navigateTo({
				url: `/subPackage/detail/detail?type=${props.imgObj.type}`
			})
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
					right: 10%;
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
	.calendar-card {
		width: 100%;
		height: 220px;
		border-radius: 16px;
		overflow: hidden;
		position: relative;
		margin-bottom: 10px;
		.model {
			border-radius: 16px;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color:  rgb(3, 31, 42, 0.3);
			color: #fff;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			font-family: cursive;
			.guide {
				transform: rotate(-90deg);
				position: absolute;
				top: 16%;
				right: 18%;
			}
			.arrow:after, .arrow:before {
				background: #fff;
				content: "";
				display: block;
				height: 2px;
				position: absolute;
				top: 0;
				left: 0;
				width: 9px;
				box-shadow: 1px 1px 20px 0 #fff;
			}
			.arrow:before {
				transform: rotate(45deg) translateX(-11%);
				transform-origin: top left;
			}
			.arrow:after {
				transform: rotate(-45deg) translateX(9%);
				transform-origin: top right;
			}
			.arrow-1 {
				animation: arrow-movement 3s ease-in-out infinite;
			}
			.arrow-2 {
				animation: arrow-movement 3s 1s ease-in-out infinite;
			}
			.arrow-3 {
				animation: arrow-movement 3s 2s ease-in-out infinite;
			}
			.arrow {
				position: absolute;
				top: 35px;
				transform-origin: 50% 50%;
				transform: translate3d(-50%,0,0);
			}
			@keyframes arrow-movement {
			    0% {
			        opacity: 0;
			        top: 0;
			    }
			    70% {
			        opacity: 1;
			    }
			    100% {
			        opacity: 0;
			    }
			}
			.model-title {
				font-weight: 600;
				font-size: 18px;
				margin-bottom: 5px;
			}
		}
		
	}
</style>