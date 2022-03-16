<template>
	<select v-model="msValue" class="multiselect" multiple>
		<slot v-if="options" name="options">
			<option v-for="option in options" :key="option.value" :value="option.value">
				{{ option.text }}
			</option>
		</slot>
		<slot></slot>
	</select>
</template>
<script>
import jQuery from '~/plugins/jquery'
require('~/assets/js/vendor/jquery.multi-select');
export default {
	name: 'MultiSelect',
	props: {
		settings: {
			type: Object,
			default: () => {}
		},
		options: {
			type: Array,
			default: () => []
		},
		value: {
			type: Array,
			default: () => []
		},
		apiMethods: {
			type: Array,
			default: () => []
		}
	},
	data () {
		return {
			sliderData: null,
			msValue: []
		}
	},
	watch: {
		value (newVal) {
			// this.msValue = newVal;
			// $(this.el).multiSelect('deselect_all');
			$(this.$el).find('option').each(function (index, item) {
				if(newVal.indexOf(item.value) !== -1) {
					$(item).attr('selected', 'selected')
				}
			});
			$(this.$el).multiSelect('refresh')
		},
		msValue (newValue) {
			this.$emit('input', newValue)
		},
		apiMethods (newValue) {
			if(newValue[0] === 'deselect_all') {
				$(this.$el).multiSelect('deselect_all')
			}
			if(newValue[0] === 'select_all') {
				$(this.$el).multiSelect('select_all')
			}
			if(newValue[0] === 'select') {
				$(this.$el).multiSelect('select', newValue[1])
			}
			if(newValue[0] === 'deselect') {
				$(this.$el).multiSelect('deselect', newValue[1])
			}
		}
	},
	mounted () {
		const self = this;
		const el = this.$el;
		let _settings = {
			afterSelect: function (values){
				var selected = [];
				$(el).find('option:selected').each(function (index, item) {
					selected.push(item.value);
				});
				self.msValue = selected;
			},
			afterDeselect: function (values){
				var selected = [];
				$(el).find('option:selected').each(function (index, item) {
					selected.push(item.value);
				});
				self.msValue = selected;
			}
		};
		const settings = $.extend(_settings, this.settings);
		this.$nextTick(function () {
			$(el).multiSelect(settings)
		})
	},
	destroyed () {
		$(this.$el).multiSelect('destroy')
	}
}
</script>
<style lang="scss">
	@import "../assets/scss/plugins/multiselect.scss";
</style>
