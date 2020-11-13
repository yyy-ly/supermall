<template>
  
  <div class="tab-bar-item" @click="itemClick"> 
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
  	<div :style="activeStyle"><slot name="item-text"></slot></div>
		<!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
  </div>
	
</template>
<script>
export default {
	name: "TabBarItem",
	//父传子props
	props: {
		path: String,
		activeColor: {
			type: String,
			default: 'red'//默认值为红色
		}
	},
	data(){
		return{
			// isActive: true
		}
	},
	computed: {
		isActive(){
			// indexOf =-1 ,从this.$route.path里边没找到this.path（当前处于活跃的组件）
			return this.$route.path.indexOf(this.path) !== -1 

		},
		activeStyle(){
			//如果处于活跃，为this.activeColor，负责为空
			return this.isActive ? {color: this.activeColor} : {}

		}
	},
	methods: {
		itemClick(){
			this.$router.replace(this.path).catch(err => err)
		}
	}

	
}
</script>
<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
		font-size:14px;
  }
  .tab-bar-item img{
    height:20px;
    width:20px;
		margin-top:3px;
		margin-bottom:2px;
		vertical-align: middle;
		
	}

</style>