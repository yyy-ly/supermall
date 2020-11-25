import {debounce} from "common/utils"
import BackTop from "components/content/backTop/BackTop"

export const itemListenerMixin = {
	components: {

	},
	methods: {

	},
	data() {
		return{
			itemImgListener: null
		}
	},
	mounted() {
		const refresh = debounce(this.$refs.scroll.refresh,200)	
		this.itemImgListener = () => {
			refresh()
		}
		this.$bus.$on('itemImageLoad',this.itemImgListener)
		// console.log('混入');
	}
}

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backClick(){
			// this.$refs.scroll获取scroll组件，.scroll获取组件里边的scroll对象，获取.scrollTo（x,y,time）方法
			// this.$refs.scroll.scroll.scrollTo(0,0,500)

			this.$refs.scroll.scrollTo(0,0,300)
		},
		listenShowBackTop(position){
			this.isShowBackTop = (-position.y)  > 1000

		}
	}

}