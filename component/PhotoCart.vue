<template>
	<view class="card-box" :ref="imgType === 'vertical' ? 'vertical' : 'cross'" :class="imgType === 'vertical' ? 'vertical' : 'cross' " @click="openCard">
		<image :src="imgUrl" mode="aspectFill"></image>
		<view class="card-info">
			<view class="title">
				{{title}}
			</view>
			<view class="place">
				{{place}}
			</view>
			<view class="discription" v-if="imgType === 'cross'">
				{{discription}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	const cross = ref(null)
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
		},
		discription: {
			type: String,
			default: '这是一段描述'
		}
	})
	const openCard = (e) => {
		// 使用ref获取当前dom
		cross.value.$el.className.indexOf('active') === -1 ? cross.value.$el.classList.add('active') : cross.value.$el.classList.remove('active')
		
	}
</script>

<style lang="scss" scoped>
	.card-box.active {
		image {
			height: 240px !important;
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
	.card-box {
		
		border-radius: 16px;
		box-shadow: 0px 0px 10px #f8f8f8;
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
		margin-right: 14px;
		image {
			width: 100%;
			height: 180px;
			transition: all .3s ease-in-out; 
		}
		&.vertical {
			width: 142px;
		}
		&.cross {
			width: calc(100% - 10px);
			margin-bottom: 10px;
			image {
				height: 160px;
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
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.place {
				margin-top: 5px;
				font-size: 12px;
				color: #afafaf;
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