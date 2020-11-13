module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'components': '@/components',
				'network': '@/network',
				'common': '@/common',
				'views': '@/views',
			}
		}
	}
}