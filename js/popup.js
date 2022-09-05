import plugins from '../plugins/index.js'

free.awesome()

const [currentTab] = await chrome.tabs.query({
	active: true,
	currentWindow: true
})

initPlugins()

async function initPlugins() {
	free.forEach(plugins, renderPlugin)
}

function renderPlugin(plugin) {
	plugin.checkEnable(currentTab.url)

	var el = document.importNode(free.utils.importTemplate('#tmp_plugin'), true),
		el_name = el.find('[data-name]')

	el_name.innerText = plugin.title

	if (plugin.enable) {
		el.classList.add('enable')
		el.addEventListener('click', () => {
			if (plugin.active) return

			plugin.activate(currentTab.id)

			el.classList.add('active')
		})
	} else {
		el.classList.add('disable')
	}

	free('#plugins').appendChild(el)
}
