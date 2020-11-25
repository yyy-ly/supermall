<template>
	<div class="wrapper"> 	
		<ul class="content">
			<button @click="btnClick">按钮</button>
			<li>分类列表1</li>
			<li>分类列表2</li>
			<li>分类列表3</li>
			<li>分类列表4</li>
			<li>分类列表5</li>
			<li>分类列表6</li>
			<li>分类列表7</li>
			<li>分类列表8</li>
			<li>分类列表9</li>
			<li>分类列表10</li>
			<li>分类列表11</li>
			<li>分类列表12</li>
			<li>分类列表13</li>
			<li>分类列表14</li>
			<li>分类列表15</li>
			<li>分类列表16</li>
			<li>分类列表17</li>
			<li>分类列表18</li>
			<li>分类列表19</li>
			<li>分类列表20</li>
			<li>分类列表21</li>
			<li>分类列表22</li>
			<li>分类列表23</li>
			<li>分类列表24</li>
			<li>分类列表25</li>
			<li>分类列表26</li>
			<li>分类列表27</li>
			<li>分类列表28</li>
			<li>分类列表29</li>
			<li>分类列表30</li>
			<li>分类列表31</li>
			<li>分类列表32</li>
			<li>分类列表33</li>
			<li>分类列表34</li>
			<li>分类列表35</li>
			<li>分类列表36</li>
			<li>分类列表37</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
			<li>分类列表</li>
		</ul>
	</div>	
</template>

<script>
import BScroll from "better-scroll"


export default {
	name: 'Category',
	data(){
		return{
			scroll: null
		}
	},
	//组件挂载完成调用'.wrapper'=document.querySelecter('.wrapper')
	mounted(){
		this.scroll = new BScroll(document.querySelector('.wrapper'),{
			probeType: 3,
			pullUpLoad: true

		})
		// this.scroll.on('scroll',(position) => {
		// console.log(position);	
		// })
		this.scroll.on('pullingUp',() => {
			console.log('上拉加载更多');
		})
	},
	methods: {
		btnClick(){
			console.log('btnClick')
		}
	}
	
}
</script>

<style scoped>
	.wrapper{
		/* 原生的scroll在移动端非常卡顿 */
		height: 150px;
		background-color: red;
		overflow: hidden;
		/* overflow-y: scroll; */
	}
</style>
