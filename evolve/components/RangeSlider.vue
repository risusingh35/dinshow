<template>
	<input type="text" class="uk-input" :value="value">
</template>
<script>
import jQuery from '~/plugins/jquery'
require('ion-rangeslider');
export default {
	name: 'IonRangeSlider',
	props: {
		settings: {
			type: Object,
			default: () => {}
		},
		value: {
			type: [String, Number],
			default: null
		}
	},
	data () {
		return {
			sliderData: null
		}
	},
	watch: {
		value (newVal) {
			if (typeof newVal === 'number') {
				this.sliderData.update({
					from: newVal
				})
			}
			if (typeof newVal === 'string') {
				var val = newVal.split(";");
				this.sliderData.update({
					from: val[0],
					to: val[1]
				})
			}
		}
	},
	mounted () {
		const self = this;
		let _settings = {
			onFinish: function (data) {
				if(this.type === 'single') {
					self.$emit('input', data.from)
				}
				if(this.type === 'double') {
					self.$emit('input', String(data.from + ';' + data.to))
				}
			}
		};
		const settings = $.extend(_settings, this.settings);
		let slider = $(this.$el).ionRangeSlider(settings);
		this.sliderData = slider.data("ionRangeSlider")
	},
	destroyed () {
		$(this.$el).data("ionRangeSlider").destroy()
	}
}
</script>
<style lang="scss">
	@import "../assets/scss/plugins/range_slider.scss";
</style>
