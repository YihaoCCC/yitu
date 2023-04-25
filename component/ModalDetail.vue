<template>
	<view class="modal" :class="closeModal ? 'close-model' : ''">
		<image class="modal-img" :src="imgUrl" mode="widthFix"></image>
		<view class="close" @click="close">
			<uni-icons type="closeempty" size="30" color="#fff"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	defineProps(['imgUrl'])
	
	const screenHeight = ref('')
	onMounted(() => {
		let currentPage = getCurrentPages()
		currentPage[0].route.indexOf('calendar') !== -1 ? screenHeight.value = '100px' : screenHeight.value = '30px'
		console.log(screenHeight.value);
	})
	const emits = defineEmits(['close'])
	const closeModal = ref(false)
	const close = () => {
		closeModal.value = true
		emits('close')
		setTimeout(() => {
			closeModal.value = false
		}, 600)
	}
</script>

<style lang="scss" scoped>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: down .5s cubic-bezier(0, 1, 0.95, 1.05) forwards;
		&.close-model {
			animation: up .5s ease-in-out forwards;
		}
		@keyframes down {
			0% {
				transform: translateY(-100vh);
				opacity: 0;
			}
			100% {
				transform: translateY(0);
				opacity: 1;
			}
			
		}
		@keyframes up {
			from {
				opacity: 1;
			}
			to {
				transform: translateY(-100vh);
				opacity: 0;
			}
		}
		.model-img {
			width: 80%;
		}
		.close {
			position: fixed;
			top: v-bind(screenHeight);
			right: 20px;
			background: rgba(255, 255, 255, 0.5);
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
	}
</style>