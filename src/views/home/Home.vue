<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"/>
		<recommend-view :recommends="recommends"/>
		
	</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
//defaullt 导出才可以把{}删掉
import {getHomeMultidata} from 'network/home'


export default {
	name: 'Home',
	components: {
		NavBar,
		HomeSwiper,
		RecommendView 
	},
	data(){
		return {
			banners: [],
			recommends: []
		}

	},
	//组件创建好，发送网络请求
	created(){
		//1.请求多个数据
		getHomeMultidata().then(res => {
			this.banners = res.data.banner.list;
			this.recommends = res.data.recommend.list;
		})
	}
	
}
</script>

<style>
	.home-nav{
		background-color: var(--color-tint);
		color: white;
	}
</style>
