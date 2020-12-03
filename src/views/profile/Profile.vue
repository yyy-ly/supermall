<template>
	<div id="profile">
		<nav-bar class="nav-bar"><div slot="center">YY商城</div></nav-bar>
		<user-info/>

		<div class="account">
			
				<div class="account-item">
					<div class="number">
					 <span class="balance">0.00</span>元
					</div>
					<div class="account-info">我的余额</div>
				</div>
				
				<div class="account-item">
					<div class="number">
					 <span class="balance">0</span>个
					</div>
					<div class="account-info">我的优惠</div>	
				</div>

				<div class="account-item">
					<div class="number">
					 <span class="balance">0</span>分
					</div>
					<div class="account-info">我的积分</div>
				</div>
			
		</div>


		<list-view :list-data="orderList" class="order-list"/>
		<list-view :list-data="serviceList" class="service-list"/>

	</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import UserInfo from './childComps/UserInfo'
import ListView from "./childComps/ListView"

export default {
	name: 'Profile',
	components: {
		NavBar,
		UserInfo,
		ListView
	},
	data: function() {
		return {
				orderList: [
					{icon: '#message',iconColor: "#ff8198",info: "我的消息"},
					{icon: '#pointer', iconColor: '#fc7b53', info: '积分商城'},
					{icon: '#vip', iconColor: '#ffc636', info: '会员卡'}
				],
				serviceList: [
          {icon: '#cart', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#shopping', iconColor: '#ff8198', info: '下载购物APP'},
				]
				
		}	
	}
}
</script>

<style>
	#profile {
		 background-color: #f2f2f2;
		 overflow: hidden;
	}
	.nav-bar {
		background-color: var(--color-tint);
		color: #fff;
		font-weight: 700;
	}
	.account {
		display: flex;
	}
	.account-item {
		width: 100%;	
		text-align: center;
		background-color: #fff;
		margin-right: 1px;
		color: #666;
    font-size: 13px;
    padding: 18px;
	}
	.account-item .balance {
		color:  #ff5f3e;
		font-size: 24px;
		font-weight: 700;
	}
	.account-info {
		margin-top :12px;
	}

	.order-list, .service-list {
    margin-top: 12px;
  }

</style>
