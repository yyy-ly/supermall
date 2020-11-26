import {
	ADD_COUNTER,
	ADD_TO_CART
 }from './mutation-type'

export default {
	//actions 中是异步操作和判断
	addCart(context,payload) {
			return new Promise((resolve,reject) => {
			//1.查找之前数组中是否有该商品
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
	
			//2.判断 oldProduct
			if(oldProduct){ //数量+1
				// oldProduct.count += 1
				context.commit(ADD_COUNTER,oldProduct)
				resolve('当前商品数量+1')
			}else{ //添加新的商品
				payload.count = 1
				// context.state.cartList.push(payload)
				context.commit(ADD_TO_CART,payload)
				resolve('添加了新的商品')
			}
		})
	}
}