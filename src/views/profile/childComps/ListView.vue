<template>
	<div class="list-view">
		<div v-for="(item,index) in ListData" :key="index" class="item">
			<span class="icon">
				<svg :fill="item.iconColor"><use :xlink:href="item.icon"></use></svg>
				<!-- <img src="item.icon" alt=""> -->
			</span>
			<div class="info">{{item.info}}</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ListView",
	props: {
		ListData: {
			type: Array,
			default: function() {
				return []
			}
		}
	}
}
</script>

<style scoped>
	.list-view {
		background-color: #fff;
		color: #333;
		font-size: 15px;
	}
	.item {
		height: 44px;
		line-height: 44px;
		position: relative;

	}
	.icon img {
		width: 18px;
		height: 18px;
	}
	.icon {
		position: absolute;
		margin-top: 10px;
		left: 16px;
		right: -7px;	 
	}
	.info {
		margin-left: 40px;
		padding-left: 5px;
		border-bottom: 2px solid rgba(100,100,100,.1);
	}
	.item:last-of-type .info {
		border-bottom: none;
	}
</style>