import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// createApp(App).use(router).mount('#app')
new Vue({
	render: h => h(App),
	router,
}).$mount('#app')