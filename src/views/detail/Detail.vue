<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"/>
		<scroll class="content" ref="scroll" 
						 @scroll="contentScroll" 
						:probe-type="3">
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
			<detail-param-info :param-info="paramInfo" ref="param"/>
			<Detail-comment-info :comment-info="conmmentInfo" ref="comment"/>
			<goods-list :goods="recommends" ref="recommend"/>
		</scroll>
		<detail-bottom-bar @addCart="addToCart"/>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
		<!-- 直接传入字符串不需要： -->
		<!-- <toast :message="message" :show="show"/>  -->
	</div>  
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList"

import {getDetail, Goods, Shop,GoodsParam,getRecommend} from "network/detail"
import {debounce} from "common/utils"
import {itemListenerMixin,backTopMixin} from "common/mixin"

import {mapActions} from 'vuex'
// import Toast from "components/common/toast/Toast"

export default {
	name: "Detail",
	data(){
		return {
			iid: null,
			topImages: [],
			goods: {},
			shop: {},
			detailInfo: {},
			paramInfo: {},
			conmmentInfo: {},
			recommends: [],
			themeTopYs: [],
			getThemeTopY: null,
			currentIndex: 0,
			// message: '',
			//  show: false
		}
	},
	mixins: [itemListenerMixin,backTopMixin],
	components: {
		DetailNavBar,
		DetailSwiper,
		DetailBaseInfo,
		DetailShopInfo,
		DetailGoodsInfo,
		DetailParamInfo,
		DetailCommentInfo,
		DetailBottomBar,
		Scroll,
		GoodsList,	
		// Toast
	},
	created() {
		//1.保存传入的 iid
		this.iid = this.$route.params.iid

		//2.根据iid 请求详细数据
		getDetail(this.iid).then(res => {

			console.log(res);

			//1.获取数据
			const data = res.result;

			//2.获取顶部的图片轮播图
			this.topImages = data.itemInfo.topImages

			//3.获取商品信息
			this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

			//4.创建店铺信息
			this.shop = new Shop(data.shopInfo)

			//5.保存商品的详情数据
			this.detailInfo = data.detailInfo;

			//6.获取参数的信息
			this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
			 
			 //7.获取评论信息
			 if(data.rate.cRate !== 0){
				 this.conmmentInfo = data.rate.list[0]
			 } 

			//  this.$nextTick(() => {
			// 	 //根据最新的数据，dom已经被渲染出来，
			// 	 //但是图片没有加载出来（目前获取到的offsetTop是不包含图片的）
			// 	 //一般offsetTop 值不对都是图片的问题
			// 	 this.themeTopYs = []

			// 	 this.themeTopYs.push(0)
			// 	 this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
			// 	 this.themeTopYs.push(this.$refs.comment.$el.offsetTop -44)
			// 	 this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -44)
						
			// 	 console.log(this.themeTopYs)

			//  }) 
		})
		
		//3.请求推荐数据
		getRecommend().then(res => {
			console.log(res);
			this.recommends = res.data.list  

		})
		//4.给getThemeTopY 赋值(给getThemeTopY 赋值的操作进行防抖)
		this.getThemeTopY = debounce(() => {
			this.themeTopYs = []

			this.themeTopYs.push(0)
			this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
			this.themeTopYs.push(this.$refs.comment.$el.offsetTop -44)
			this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -44)
			this.themeTopYs.push(Number.MAX_VALUE)
						
			console.log(this.themeTopYs);

		},100)

	},
	methods: {
		...mapActions(['addCart']),
		imageLoad(){
			this.$refs.scroll.refresh()
			this.getThemeTopY()
		},
		itemClick(index) {
			// console.log(index); 
			this.currentIndex = index;
			this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],30)	 
		},
		contentScroll(position) {
			//1.获取	y 值
			const positionY = -position.y

			//2.positionY 和主题中值进行对比
			let length = this.themeTopYs.length
			for(let i = 0 ; i < length -1; i++) {
				// if(this.currentIndex !== i &&
				// ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length -1 && positionY >= this.themeTopYs[i]))){
				// this.currentIndex = i;
				// this.$refs.nav.currentIndex = this.currentIndex;

				if(this.currentIndex !== i &&(( positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) )){
				this.currentIndex = i;
				this.$refs.nav.currentIndex = this.currentIndex;	
			}
		}
			//3.判断backTop是否显示
			this.listenShowBackTop(position)		
		},
		addToCart() {
			//1. 获取购物车需要展示的信息
			const product = {}
			product.image = this.topImages[0];
			product.title = this.goods.title;
			product.desc = this.goods.desc;
			product.price = this.goods.realPrice ; 
			product.iid = this.iid

			//2.将商品添加到购物车(1.Promise 2.mapActions)
			// this.$store.commit('addCart',product)
			this.addCart(product).then(res => {
			// 	this.show= true;
			// 	this.message= res;

			// 	setTimeout(() => {
			// 		this.show = false;
			// 		this.message = ''
			// 	},1500)
			this.$toast.show(res,2000)
			})
			

			// this.$store.dispatch('addCart',product).then(res => {
			// 	console.log(res);
			// })
		}
	},

	mounted() {
	},

	destroyed() {
		this.$bus.$off('itemImageLoad',this.itemImgListener)
	}
}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}
	.detail-nav {
		position:relative;
		z-index: 9;
		background-color:#fff;
	}
	.content {
		height: calc(100% - 44px - 49px);
	}

</style>