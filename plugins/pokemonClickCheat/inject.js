;(function () {
	if (window.__POKEMONCLICK_CHEAT__) return

	window.__POKEMONCLICK_CHEAT__ = new Vue({
		el: document.body.appendChild(document.createElement('div')),
		data: {
			autoAttackTimer: null,
			autoFarmingTimer: null,
			autoAttackInterval: 10,
			autoFarmingInterval: 1000
		},
		methods: {
			autoAttack() {
				if (this.autoAttackTimer) {
					window.clearInterval(this.autoAttackTimer)
					this.autoAttackTimer = null
				} else {
					this.autoAttackTimer = window.setInterval(this.attackHandler, this.autoAttackInterval)
				}
			},
			attackHandler() {
				const el = document.querySelector('.col.no-gutters.clickable')
				0
				if (!el) return

				el.click()
			},
			autoFarming() {
				if (this.autoFarmingTimer) {
					window.clearInterval(this.autoFarmingTimer)
					this.autoFarmingTimer = null
				} else {
					this.autoFarmingTimer = window.setInterval(this.farmingHandler, this.autoFarmingInterval)
				}
			},
			farmingHandler() {
				const plantBtn = document.querySelector(
						'[data-bind="click: function(){App.game.farming.plantAll(FarmController.selectedBerry())}"]'
					),
					harvestBtn = document.querySelector(
						'[data-bind="click: function(){App.game.farming.harvestAll()}"]'
					)

				if (!plantBtn || !harvestBtn) return

				harvestBtn.click()
				plantBtn.click()
			}
		},
		render(h) {
			return h('div', { class: 'pokemon-cheat-ctn' }, [
				h(
					'div',
					{
						class: [
							'btn',
							{
								active: !!this.autoAttackTimer
							}
						],
						on: {
							click: this.autoAttack
						}
					},
					'自动攻击'
				),
				h(
					'div',
					{
						class: [
							'btn',
							{
								active: !!this.autoFarmingTimer
							}
						],
						on: {
							click: this.autoFarming
						}
					},
					'自动种田'
				)
			])
		}
	})
})()
