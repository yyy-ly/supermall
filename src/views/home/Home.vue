<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control :titles="['流行','新款','精选']"  
 									 @tabClick="tabClick"
									 ref="tabControl1"
									 class="tab-control"
									 v-show="isTabFixed"/>
		<scroll class="content" 
						ref="scroll" 
						:probeType="3" 
						@scroll="contentScroll" 
						:pull-up-load="true"
						@pullingUp="loadMore" >
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
			<recommend-view :recommends="recommends"/>
			<feature-view/> 
			<tab-control :titles="['流行','新款','精选']"  
 									 @tabClick="tabClick"
									 ref="tabControl2"/>
			<!-- <goods-list :goods="goods[currentType].list"/> -->
			<goods-list :goods="showGoods"/>
		</scroll>
		<!-- 监听组件事件，必须加 .native -->
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import {debounce} from "common/utils"
import {itemListenerMixin,backTopMixin} from "common/mixin"


//defaullt 导出才可以把{}删掉
import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
	name: 'Home',
	components: {
		NavBar,
		HomeSwiper,
		RecommendView,
		FeatureView,
		TabControl,
		GoodsList,
		Scroll,
		
	},
	mixins: [itemListenerMixin,backTopMixin],
	data(){
		return {
			banners: [],
			recommends: [],
			goods: {
				'pop': {page: 0,list: []},
				'new': {page: 0,list: []},
				'sell': {page: 0,list: []},
			},
			currentType: 'pop',
			isShowBackTop: false,
			tabOffsetTop : 0,
			isTabFixed: false,
			saveY: 0,
		}
	},
	computed: {
		showGoods(){
			return this.goods[this.currentType].list
		}
	},
	destroyed(){
		console.log('home destroyed');
	},
	activated(){
	  this.$refs.scroll.scrollTo(0,this.saveY,0)
		this.$refs.scroll.refresh()
	},
	deactivated(){
		//1.	保存Y
		this.saveY = this.$refs.scroll.getScrollY()
		// console.log(this.saveY);
		//2.取消全局变量的监听
		this.$bus.$off('itemImageLoad',this.itemImgListener)
	},
	//组件创建好，发送网络请求
	created(){
		//1.请求多个数据
		this.getHomeMultidata()
		//2.请求商品数据
		this.getHomeGoods('pop',1)
		this.getHomeGoods('new',1)
		this.getHomeGoods('sell',1)
	},
	mounted() {
		// //1.监听item中图片加载完成
		// const refresh = debounce(this.$refs.scroll.refresh,200)

		// //对监听的事件进行保存	
		// this.itemImgListener = () => {
		// 	refresh()
		// }
		// this.$bus.$on('itemImageLoad',this.itemImgListener)
	},
	methods: {
		//事件监听相关方法
		tabClick(index){
			switch(index){
				case 0:
					this.currentType = 'pop';
					break;
				case 1:
					this.currentType = 'new';
					break;
				case 2:
					this.currentType = 'sell';
					break;
			}
			this.$refs.tabControl1.currentIndex = index;
			this.$refs.tabControl2.currentIndex = index;
		},
		// backClick(){
		// 	// this.$refs.scroll获取scroll组件，.scroll获取组件里边的scroll对象，获取.scrollTo（x,y,time）方法
		// 	// this.$refs.scroll.scroll.scrollTo(0,0,500)

		// 	this.$refs.scroll.scrollTo(0,0)
		// },
		contentScroll(position){
			//1.判断backTop是否显示
			this.listenShowBackTop(position)		

			//2.决定tabCtrol是否吸顶（position: fixed）
			this.isTabFixed = (-position.y) > this.tabOffsetTop
		},
		loadMore(){
			this.getHomeGoods(this.currentType)
		},
		swiperImageLoad(){
			//2.获取tabCtrol的offsetTop
			//所有组件都有一个$el属性，用于获取组件中的元素
			this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
		},

		// 网络请求相关方法
		getHomeMultidata(){
			getHomeMultidata().then(res => {
			this.banners = res.data.banner.list;
			this.recommends = res.data.recommend.list;
		})
		},
		getHomeGoods(type){
			//page+1 是为了传参数请求数据
			const page = this.goods[type].page + 1;
			getHomeGoods(type,page).then(res => {
				//res保存的是局部变量，当函数执行完就会销毁，将res.data.list中的数据传到this.goods[type].list中保存
			this.goods[type].list.push(...res.data.list)
			//page+1是为了翻页
			this.goods[type].page += 1
			// this.$refs.scroll.scroll.finishPullUp()

			//完成下拉加载更多
			this.$refs.scroll.finishPullUp()

		})
		}
	}	
}
</script>

<style scoped>
	#home{
		/* padding-top: 44px; */
		height: 100vh;
		position: relative;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: white;

		/* 在使用浏览器原生滚动时，为了让导航不跟着一起滚动 */
		/* position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}
	.tab-control {
		position: relative;
		z-index: 9;
	}
	.content{
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
	/* .content{
		height: calc(100% - 93px);
		overflow: hidden;
		margin-top: 44px;
	} */
</style>
