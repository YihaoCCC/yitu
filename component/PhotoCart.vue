<template>
	<view class="card-box" :class="imgType === 'vertical' ? 'vertical' : 'cross' ">
		<image :src="imgUrl" mode="aspectFill"></image>
		<view class="card-info">
			<view class="title">
				{{title}}
			</view>
			<view class="place">
				{{place}}
			</view>
		</view>
	</view>
</template>

<script setup>
	defineProps({		
		imgUrl: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		place: {
			type: String,
			required: true
		},
		imgType: {
			type: String,
			default: 'vertical'
		}
			
		
	})
</script>

<style lang="scss" scoped>
	.vertical {
		width: 142px;
		height: 180px;
	}
	.card-box {
		
		border-radius: 16px;
		box-shadow: 0px 0px 10px #f8f8f8;
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
		margin-right: 14px;
		image {
			width: 100%;
			height: 100%;
		}
		&.vertical {
			width: 142px;
			height: 180px;
		}
		&.cross {
			width: calc(100% - 10px);
			height: 160px;
			margin-bottom: 10px;
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
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.place {
				margin-top: 5px;
				font-size: 12px;
				color: #afafaf;
			}
		}	
	}
</style>