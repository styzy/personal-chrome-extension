const libsMap = {
	['vue']: 'libs/vue.js',
	['axios']: 'libs/axios.min.js'
}

class Plugin {
	#name
	#title
	#enableCheck
	#libs
	#jsInjects
	#cssInjects
	#enable = false
	#active = false
	get name() {
		return this.#name
	}
	get title() {
		return this.#title
	}
	get enable() {
		return this.#enable
	}
	get active() {
		return this.#active
	}
	constructor({
		name = '',
		title = '',
		enableCheck,
		libs = [],
		injects: { js: jsInjects = [], css: cssInjects = [] } = {}
	} = {}) {
		this.#name = name
		this.#title = title
		this.#enableCheck = enableCheck
		this.#libs = libs
		this.#jsInjects = jsInjects
		this.#cssInjects = cssInjects
	}
	checkEnable(...args) {
		if (!this.#enableCheck) return
		this.#enable = this.#enableCheck(...args)
	}
	async activate(tabId) {
		this.#active = true

		// 注入库
		await chrome.scripting.executeScript({
			target: { tabId },
			files: this.#libs.map((lib) => libsMap[lib]).filter((path) => !!path)
		})
		console.log(this.#libs.map((lib) => libsMap[lib]).filter((path) => !!path))

		// 注入插件css
		await chrome.scripting.insertCSS({
			target: { tabId },
			files: this.#cssInjects.map((path) => this.resolveAlias(path))
		})

		// 注入插件js
		await chrome.scripting.executeScript({
			target: { tabId },
			files: this.#jsInjects.map((path) => this.resolveAlias(path))
		})
	}
	resolveAlias(path) {
		return path.replace('@', `plugins/${this.name}`)
	}
}

export default Plugin
