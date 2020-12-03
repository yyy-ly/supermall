<template>
	<scroll id="tab-menu">
			<div class="menu-list">
				<div class="menu-list-item" 
						v-for="(item,index) in categories" 
						:key="index"
						:class="{active: index === currentIndex}"
						@click="itemClick(index)">
						{{item.title}}
				</div>
			</div>
	</scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
	name: "TabMenu",
	props: {
		categories: {
			type: Array,
			default: []
		}
	},
	components: {
		Scroll
	},
	data() {
		return {
			currentIndex: 0
		}
	},
	methods: {
		itemClick(index) {
			this.currentIndex = index
			this.$emit('selectItem',index)
		}
	}
}
</script>

<style scoped>
	#tab-menu  {
		background-color: #f6f6f6;
		width: 100px;
		height: 100%;
		box-sizing: border-box;

	}
	.menu-list-item {
		text-align: center;
		font-size: 14px;
		height: 45px;
		line-height: 45px;

	}
	.menu-list-item.active {
		color: var(--color-high-text);
		background-color:#fff;
		font-weight: 700;
		border-left: 3px solid var(--color-high-text);
	}

</style>