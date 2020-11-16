<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"/>
		<recommend-view :recommends="recommends"/>
		<feature-view/>
		<tab-control :titles="['流行','新款','精选']" class="tab-control"/>
		<ul>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>
			<li>列表</li>

		</ul>
		
		

	</div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"

//defaullt 导出才可以把{}删掉
import {getHomeMultidata} from 'network/home'

export default {
	name: 'Home',
	components: {
		NavBar,
		HomeSwiper,
		RecommendView,
		FeatureView,
		TabControl
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
	#home{
		padding-top: 44px;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: white;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}

	.tab-control {
		 position: sticky;
		 top: 44px;
	}
</style>
