<template>
	<view :class="crossExpandId === imgObj._id ? 'active':''">
		<view class="card-box" :class="imgObj.imgType === 'vertical' ? 'vertical' : 'cross' " @click="handleClick">
			<image class="card-img" :src="imgObj.url" mode="aspectFill"></image>
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
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	const emit =defineEmits(['active'])
	const props = defineProps({	
		imgObj: {
			type: Object,
			default: () => []
		},
		crossExpandId: String
	})
	const handleClick = () => {
		if(props.imgObj.imgType === 'cross')  {
			emit('active', props.imgObj._id)
		} else {
			uni.navigateTo({
				url: `/subPackage/detail/detail?type=${props.imgObj.type}`
			})
		}
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
	
	.card-box {
		border-radius: 16px;
		box-shadow: 0px 0px 10px #f8f8f8;
		position: relative;
		overflow: hidden;
		margin-right: 14px;
		transition: all .3s ease-in-out; 
		height: 190px;
		.card-img {
			width: 100%;
			height: 100%;
		}
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