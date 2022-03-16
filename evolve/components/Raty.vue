<template>
	<div></div>
</template>

<script>
import jQuery from '~/plugins/jquery'
require('raty-js');
export default {
	name: 'StarRating',
	props: {
		settings: {
			type: Object,
			default: () => {}
		},
		value: {
			type: Number,
			default: undefined
		},
		apiMethods: {
			type: Array,
			default: () => []
		}
	},
	data () {
		return {
			scoreValue: undefined
		}
	},
	watch: {
		value (newVal) {
			$(this.$el).raty('score', newVal);
			this.scoreValue = newVal;
		},
		scoreValue (newValue) {
			this.$emit('input', newValue)
		},
		apiMethods (newValue) {
			if(newValue[0] === 'readOnly') {
				$(this.$el).raty('readOnly', newValue[1])
			}
			if(newValue[0] === 'cancel') {
				$(this.$el).raty('cancel', true);
			}
		}
	},
	mounted () {
		const self = this;
		const el = this.$el;
		let _settings = {
			score: this.value,
			starType: 'span',
			click (score) {
				self.scoreValue = score || 0;
			}
		};
		const settings = $.extend(_settings, this.settings);
		this.$nextTick(function () {
			$(el).raty(settings)
		})
	},
	destroyed () {
		$(this.$el).raty('destroy')
	}
}
</script>

<style lang="scss">
	@import '../assets/scss/plugins/raty.scss';
</style>
