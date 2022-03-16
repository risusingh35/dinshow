<template>
	<div ref="chart"></div>
</template>
<script>
export default {
	name: 'GanttChart',
	props: {
		data: {
			type: Array,
			required: true
		},
		options: {
			type: Object,
			default: () => {}
		},
		tooltips: {
			type: Boolean,
			default: true
		}
	},
	mounted () {
		this.$nextTick(() => {
			const self = this;
			const $chart = $(self.$refs.chart);
			let _options = {
				data: self.data,
				behavior: {
					onClick: function (data) {
						self.$emit('onClick', data)
					},
					onResize: function (data) {
						self.$emit('onResize', data)
					},
					onDrag: function (data) {
						self.$emit('onDrag', data)
					}
				}
			};
			const options = $.extend(_options, this.options);
			$chart.ganttView(options);
			if(this.tooltips) {
				$chart.find('[title]').each(function () {
					$(this).attr('data-uk-tooltip', "{offset:4}");
				});
			}
		});
	}
}
</script>
