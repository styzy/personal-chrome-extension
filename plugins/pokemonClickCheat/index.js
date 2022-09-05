export default {
	name: 'pokemonClickCheat',
	title: '宝可梦点击 游戏助手',
	libs: ['vue'],
	injects: {
		js: ['@/inject.js'],
		css: ['@/inject.css']
	},
	enableCheck(url) {
		return true
		return url.includes('pokeclicker')
	}
}
