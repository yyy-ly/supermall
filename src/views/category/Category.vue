<template>
<div id="cartgory">
	<nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
	<div class="content">
		<tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
		<scroll id="tab-content" :data="[categoryData]">
			<div>
				<tab-content-category :subcategories="showSubcategory"></tab-content-category>
				<tab-control :titles="['综合','新款','销量']" @tabClick="tabClick"></tab-control>
				<tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
			</div>
		</scroll>
	</div>
</div>	
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import TabMenu from "./childComps/TabMenu"
import TabContentCategory from "./childComps/TabContentCategory"
import Scroll from 'components/common/scroll/Scroll'
import TabControl from "components/content/tabControl/TabControl"
import TabContentDetail from './childComps/TabContentDetail'

import {getCategory,getSubcategory,getCategoryDetail} from "network/category"


export default {
	name: 'Category',
	components: {
		NavBar,
		TabMenu,
		TabContentCategory,
		Scroll,
		TabControl,
		TabContentDetail
	},
	data() {
		return {
			categories: [],
			categoryData: {},
			currentIndex: -1,
			currentType: 'pop'
		}
	},
	created() {
		//请求分类数据
		this._getCategory()
	},
	computed: {
		showSubcategory() {
			if(this.currentIndex === -1) return {}
			return this.categoryData[this.currentIndex].subcategories
		},
		showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
		}
	},
	methods: {
		_getCategory() {
			// 1.获取分类数据
			getCategory().then(res => {
		      this.categories = res.data.category.list
      // 2.初始化每个类别的子数据
      for (let i = 0; i < this.categories.length; i++) {
        this.categoryData[i] = {
          subcategories: {},
          categoryDetail: {
            'pop': [],
            'new': [],
            'sell': []
           }
         }
       }
      // 3.请求第一个分类的数据
      this._getSubcategories(0)
     })
		},
		_getSubcategories(index) {
			this.currentIndex = index;
			const mailKey = this.categories[index].maitKey
			getSubcategory(mailKey).then(res => {
				this.categoryData[index].subcategories = res.data
				this.categoryData = {...this.categoryData}
				this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
			})
		},
		_getCategoryDetail(type) {
			const miniWallkey = this.categories[this.currentIndex].miniWallkey;
			getCategoryDetail(miniWallkey,type).then(res => {
				this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
			})
		},
		selectItem(index) {
			this._getSubcategories(index)
		},
		tabClick(index) {
			switch(index) {
				case 0: 
				this.currentType = 'pop'
				break;
				case 1: 
				this.currentType = 'new'
				break;
				case 2: 
				this.currentType= 'sell'
				break;
			}
		}
	}
}
</script>

<style scoped>
	#category {
			height: 100vh;
		}
	.nav-bar {
		background-color: var(--color-tint);
		color: white;
		font-weight: 700;
	}	
	.content {
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		display: flex;
	}
	#tab-content {
    height: 100%;
    flex: 1;
  }

</style>
