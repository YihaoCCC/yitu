<template>
	<view class="container" :style="{height:screenHeight+'px'}">
	    <view class="detail" :class="showFade ? 'fadeOut' : ''" @touchstart="start" @touchend="end">
	      <image class="image" :src="currentImg.url" mode="aspectFill"></image>
	    </view>
	    <view class="place" :style="{top: `${top}px`, left: `${left}px`}">
			{{currentImg.place}}
	      <view class="line">
	        <view class="circle"></view>
	      </view>
	    </view>
	    <view class="bottom-info" @click="change">
	      <image class="bottom-info-image" :src="currentImg.url" mode="widthFix"></image>
	      <text class="discription">《{{ currentImg.discription}} 》 </text>
		  <view class="date">
			<uni-icons type="calendar" size="20" color="#f8f8f8"></uni-icons>
		  	<text>  {{ currentImg.date }}</text>

		  </view>
	    </view>
		<view class="close" @click="close">
			<uni-icons type="arrow-left" size="20" color="#fff"></uni-icons>
		</view>
	  </view>
</template>

<script setup>
	import { onLoad, onShow } from "@dcloudio/uni-app";
	import { ref, computed, reactive, onMounted } from 'vue';
	const screenHeight = ref('')
	const currentImgNum = ref(0)
	const showFade = ref()
	const left = ref()
	const top = ref()
	const list = ref([])
	const clientX = ref()
	onLoad((option) => {
		console.log(option);
		screenHeight.value = uni.getSystemInfoSync().windowHeight;
		uni.yhHttp.get('/fun/get_all_photos', { imgType: "vertical", type: option.type }).then(res => {
			list.value = res.data.data
			// currentImg.value = list.value[0].url
			
		})
		
	})
	onMounted(() => {
		top.value = (uni.getSystemInfoSync().windowHeight - 370) * Math.random()
		left.value = (uni.getSystemInfoSync().windowWidth - 180) * Math.random()
		
	})
	const change = () => {
		
		showFade.value = true
		setTimeout(() => {
			showFade.value = false
			currentImgNum.value++
			top.value = (uni.getSystemInfoSync().windowHeight - 370) * Math.random()
			left.value = (uni.getSystemInfoSync().windowWidth - 180) * Math.random()
		},800)
	}
	const currentImg = computed(() => {
		if(list.value.length) {
			if(currentImgNum.value >= list.value.length) {
				 currentImgNum.value = 0
			} 
			return list.value[currentImgNum.value] 
		} else {
			return ''
		}
	})
	
	const close = () => {
		 uni.navigateBack()
	}
	
	const start = (e) => {
		clientX.value = e.changedTouches[0].clientX;             
	}
	const end = (e) => {
		const subX = e.changedTouches[0].clientX - clientX.value;
		if( subX > 50){
			console.log('右滑')
			change()
		}else if( subX < -50){
			console.log('左滑')
			change()
		}else{
			console.log('无效')
		}
}
  </script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		position: relative;
		color: #fff;
		.detail {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			animation: fadeIn .5s ease-in-out;
			.image {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			&.fadeOut {
				animation: fadeOut .8s ease-in-out forwards;
				animation-delay: .15s;
			}
			@keyframes fadeIn {
				0% {
					opacity: 0;
					transform: translateX(-50%);
				}
				100% {
					opacity: 1;
				}
			}
			@keyframes fadeOut {
				100% {
					opacity: 0.5;
					transform: translateX(100%);
				}
			}
		}
		.bottom-info {
			position: absolute;
			bottom: 5%;
			left: 50%;
			transform: translateX(-50%);
			width: 88%;
			height: 100px;
			backdrop-filter: blur(8px);
			background: rgba(255, 255, 255, 0.2);
			border-radius: 24px;
			padding: 22px;
			box-sizing: border-box;
			transition: all .6s ease-in-out; 
			border: 2px solid rgba(255, 255, 255, 0.2);
			box-shadow:inset 0 0 6px rgba(255, 255, 255, 0.2);
			.bottom-info-image{
				width: 96px;
				height: 96px;
				border-radius: 8px;
				position: absolute;
				top: -42px;
				left: 22px;
				box-shadow: 0 5px 29px #d6d6d6;				
			}
			.discription {
				position: absolute;
				top: 10%;
				right: 20%;
				transform: translateX(20%);
				font-size: 14px;
			}
			.date {
				position: absolute;
				right: 20%;
				transform: translateX(20%);
				top: 50%;
				color: #f8f8f8;
				display: flex;
				align-items: center;
				text {
					margin-left: 6px;
				}
				
				
			}
		}
		.place {
			text-align: center;
			line-height: 47px;
			position: absolute;
			width: 166px;
			height: 50px;
			backdrop-filter: blur(8px);
			background: rgba(255, 255, 255, 0.2);
			border-radius: 25px;
			border: 2px solid rgba(255, 255, 255, 0.2);
			box-shadow:inset 0 0 6px rgba(255, 255, 255, 0.2);
			z-index: 2;
			transition: all .6s ease-in-out;
			
			.line {
				position: absolute;
				bottom: -166%;
				left: 50%;
				width: 2px;
				height: 90px;
				background: linear-gradient(transparent, #fff);
				.circle {
					position: absolute;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background-color: #fff;
					bottom: -30px;
					left: -9px;
					box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
					&::before {
						display: block;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
						content: '';
						width: 40px;
						height: 40px;
						border-radius: 50%;
						z-index: -1;
						background: transparent;
						backdrop-filter: blur(8px);
						border: 2px solid rgba(255, 255, 255, 0.3);
						box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
					}
				}
			}
			
		}
		.close {
			position: absolute;
			top: 6%;
			left: 8%;
			padding: 8px 10px;
			box-sizing: border-box;
		    background: rgba(255, 255, 255, 0.2);
			border-radius: 50%;
			border: 2px solid rgba(255, 255, 255, 0.2);
			box-shadow:inset 0 0 6px rgba(255, 255, 255, 0.2);
		}
		.fadeOut ~ .place {
			opacity: 0;
		}
		.fadeOut ~ .close {
			opacity: 0;
		}
		.fadeOut ~ .bottom-info {
			bottom: -50%;
		}
			
	}
</style>