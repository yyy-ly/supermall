<template>
	<div class="goods">
		<goods-list-item v-for="(item,index) in goods" :key="index" :goods-item ="item"/>
	</div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"
export default {
	name: "GoodsList",
	components: {
		GoodsListItem
	}, 
	props: {
			goods:{
			type: Array,
			default(){
				return []
			}
		}
	}
}
</script>

<style scoped>
	.goods{
		display:flex;	
		/* 包裹一行分几个 */
		flex-wrap: wrap;
	  /* 均等分 */
		justify-content:space-evenly;
	}

</style>